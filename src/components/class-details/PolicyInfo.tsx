
const PolicyInfo = () => {
  return (
    <section className="glass-panel rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-left">Class Policies</h2>
      <div className="space-y-4 text-neutral-600">
        <div>
          <h3 className="font-medium text-primary mb-2 text-left">Cancellation Policy</h3>
          <p className="text-left">Full refund up to 48 hours before the class. No refunds within 48 hours of the class start time.</p>
        </div>
        <div>
          <h3 className="font-medium text-primary mb-2 text-left">Group Bookings</h3>
          <p className="text-left">Available for 6 or more participants. Contact the instructor for special rates and arrangements.</p>
        </div>
        <div>
          <h3 className="font-medium text-primary mb-2 text-left">Private Sessions</h3>
          <p className="text-left">One-on-one instruction available upon request. Contact for pricing and availability.</p>
        </div>
      </div>
    </section>
  );
};

export default PolicyInfo;
