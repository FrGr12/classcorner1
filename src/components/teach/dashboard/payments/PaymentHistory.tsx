import { useState, useEffect } from "react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface Payment {
  id: number;
  created_at: string;
  total_price: number;
  payment_status: string;
  student: {
    first_name: string;
    last_name: string;
  };
  course: {
    title: string;
  };
}

const PaymentHistory = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: courseIds } = await supabase
        .from('courses')
        .select('id')
        .eq('instructor_id', user.id);

      const courseIdList = (courseIds || []).map(c => c.id);

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          created_at,
          total_price,
          payment_status,
          course:courses(title),
          profiles!bookings_student_id_fkey(
            first_name,
            last_name
          )
        `)
        .in('course_id', courseIdList)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedPayments: Payment[] = (data || []).map((payment: any) => ({
        id: payment.id,
        created_at: payment.created_at,
        total_price: payment.total_price,
        payment_status: payment.payment_status,
        student: {
          first_name: payment.profiles?.first_name || '',
          last_name: payment.profiles?.last_name || '',
        },
        course: {
          title: payment.course?.title || '',
        },
      }));

      setPayments(formattedPayments);
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

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.student.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.student.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.course.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" || 
      payment.payment_status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" } = {
      paid: "default",
      pending: "secondary",
      failed: "destructive",
    };
    return <Badge variant={variants[status] || "default"}>{status}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment History</CardTitle>
        <CardDescription>
          View and manage your course payment transactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search by student or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredPayments.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No payments found matching your criteria.
          </p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    {format(new Date(payment.created_at), "PPp")}
                  </TableCell>
                  <TableCell>
                    {`${payment.student.first_name} ${payment.student.last_name}`}
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

export default PaymentHistory;