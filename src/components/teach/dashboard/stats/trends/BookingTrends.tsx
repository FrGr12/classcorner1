
interface BookingTrendsProps {
  dateRange: string;
}

const BookingTrends = ({ dateRange }: BookingTrendsProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Booking Trends</h2>
      <p className="text-muted-foreground">Coming soon...</p>
    </div>
  );
};

export default BookingTrends;
