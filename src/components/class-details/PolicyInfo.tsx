const PolicyInfo = () => {
  return (
    <section className="glass-panel rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6">Class Policies</h2>
      <div className="space-y-4 text-neutral-600">
        <div>
          <h3 className="font-medium text-primary mb-2">Cancellation Policy</h3>
          <p>Full refund up to 48 hours before the class. No refunds within 48 hours of the class start time.</p>
        </div>
        <div>
          <h3 className="font-medium text-primary mb-2">Group Bookings</h3>
          <p>Available for 6 or more participants. Contact the instructor for special rates and arrangements.</p>
        </div>
        <div>
          <h3 className="font-medium text-primary mb-2">Private Sessions</h3>
          <p>One-on-one instruction available upon request. Contact for pricing and availability.</p>
        </div>
      </div>
    </section>
  );
};

export default PolicyInfo;