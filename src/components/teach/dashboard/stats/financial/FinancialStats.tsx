
interface FinancialStatsProps {
  dateRange: string;
}

const FinancialStats = ({ dateRange }: FinancialStatsProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Financial Stats</h2>
      <p className="text-muted-foreground">Coming soon...</p>
    </div>
  );
};

export default FinancialStats;
