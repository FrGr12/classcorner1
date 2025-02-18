
const PolicyInfo = () => {
  return (
    <section className="glass-panel rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-left">Class Policies</h2>
      <div className="space-y-6 text-neutral-600">
        <div>
          <h3 className="font-medium text-primary mb-2 text-left">Cancellation & Refund Policy</h3>
          <div className="bg-neutral-50 p-4 rounded-lg space-y-2">
            <p className="text-left font-medium">Our flexible refund policy:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Cancel more than 48 hours before class: Full refund</li>
              <li>Cancel within 48 hours of class: No refund</li>
              <li>All refunds are automatically processed to your original payment method</li>
              <li>Refunds typically take 5-7 business days to appear in your account</li>
            </ul>
          </div>
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
