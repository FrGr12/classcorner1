
interface PaymentStatsProps {
  paidCount: number;
  pendingCount: number;
}

const PaymentStats = ({ paidCount, pendingCount }: PaymentStatsProps) => (
  <>
    <span className="font-medium text-green-600">{paidCount}</span>
    {pendingCount > 0 && (
      <span className="text-sm text-muted-foreground ml-1">
        ({pendingCount} pending)
      </span>
    )}
  </>
);

export default PaymentStats;
