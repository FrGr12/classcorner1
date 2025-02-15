
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ServiceFeeBreakdownProps {
  bookingAmount: number;
}

interface FeeBreakdown {
  platform_fee: number;
  processing_fee: number;
  total_fees: number;
  net_amount: number;
}

const ServiceFeeBreakdown = ({ bookingAmount }: ServiceFeeBreakdownProps) => {
  const [feeBreakdown, setFeeBreakdown] = useState<FeeBreakdown | null>(null);

  useEffect(() => {
    const calculateFees = async () => {
      const { data, error } = await supabase
        .rpc('calculate_service_fees', { booking_amount: bookingAmount });

      if (!error && data) {
        setFeeBreakdown(data as FeeBreakdown);
      }
    };

    calculateFees();
  }, [bookingAmount]);

  if (!feeBreakdown) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-neutral-900">Fee Breakdown</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Class Price</TableCell>
            <TableCell className="text-right">${bookingAmount.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Platform Fee</TableCell>
            <TableCell className="text-right">${feeBreakdown.platform_fee.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Processing Fee</TableCell>
            <TableCell className="text-right">${feeBreakdown.processing_fee.toFixed(2)}</TableCell>
          </TableRow>
          <TableRow className="font-medium">
            <TableCell>Total</TableCell>
            <TableCell className="text-right">
              ${(bookingAmount + feeBreakdown.total_fees).toFixed(2)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <p className="text-xs text-neutral-500 mt-2">
        * Service fees help us maintain the platform and provide support for hosts and students
      </p>
    </div>
  );
};

export default ServiceFeeBreakdown;
