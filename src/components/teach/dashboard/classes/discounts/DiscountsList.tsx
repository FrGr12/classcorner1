import { useEffect, useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Discount {
  id: number;
  code: string;
  discount_type: string;
  discount_value: number;
  start_date: string;
  end_date: string;
  max_uses: number;
  current_uses: number;
}

interface DiscountsListProps {
  courseId: number;
}

const DiscountsList = ({ courseId }: DiscountsListProps) => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDiscounts = async () => {
    try {
      const { data, error } = await supabase
        .from("course_discounts")
        .select("*")
        .eq("course_id", courseId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDiscounts(data || []);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch discounts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscounts();
  }, [courseId]);

  if (loading) {
    return <div>Loading discounts...</div>;
  }

  if (discounts.length === 0) {
    return <div className="text-center text-muted-foreground">No discounts created yet</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Discount</TableHead>
          <TableHead>Usage</TableHead>
          <TableHead>Valid Until</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {discounts.map((discount) => {
          const isExpired = new Date(discount.end_date) < new Date();
          const isFullyUsed = discount.current_uses >= discount.max_uses;
          const isActive = !isExpired && !isFullyUsed;

          return (
            <TableRow key={discount.id}>
              <TableCell className="font-medium">{discount.code}</TableCell>
              <TableCell>
                {discount.discount_type === "percentage"
                  ? `${discount.discount_value}% off`
                  : `$${discount.discount_value} off`}
              </TableCell>
              <TableCell>
                {discount.current_uses}/{discount.max_uses}
              </TableCell>
              <TableCell>
                {format(new Date(discount.end_date), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                <Badge
                  variant={isActive ? "default" : "secondary"}
                  className={
                    isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }
                >
                  {isActive ? "Active" : isExpired ? "Expired" : "Fully Used"}
                </Badge>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default DiscountsList;