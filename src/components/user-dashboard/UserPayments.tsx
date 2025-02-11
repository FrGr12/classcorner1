
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Receipt, CreditCard } from "lucide-react";
import { format } from "date-fns";

interface PaymentHistory {
  id: number;
  created_at: string;
  total_price: number;
  payment_status: string;
  course: {
    title: string;
  };
}

const UserPayments = () => {
  const [payments, setPayments] = useState<PaymentHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          created_at,
          total_price,
          payment_status,
          course:courses(title)
        `)
        .eq('student_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPayments(data || []);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error fetching payments",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" } = {
      paid: "default",
      pending: "secondary",
      failed: "destructive",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>View your payment history and transactions</CardDescription>
          </div>
          <CreditCard className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center py-8">
            <Receipt className="h-12 w-12 mx-auto mb-2 text-muted-foreground/50" />
            <p className="text-muted-foreground">No payment history to display</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    {format(new Date(payment.created_at), "PPp")}
                  </TableCell>
                  <TableCell>{payment.course.title}</TableCell>
                  <TableCell>${payment.total_price}</TableCell>
                  <TableCell>{getStatusBadge(payment.payment_status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default UserPayments;
