import UserNotifications from "./UserNotifications";
import UserWaitlist from "./UserWaitlist";

const UserDashboardOverview = () => {
  return (
    <div className="space-y-6">
      <UserNotifications />
      <UserWaitlist />
    </div>
  );
};

export default UserDashboardOverview;