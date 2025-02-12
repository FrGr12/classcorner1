
import ClassSection from "./components/ClassSection";
import { useClassData } from "./hooks/useClassData";

const UserDashboardOverview = () => {
  const { upcomingClasses, waitlistedClasses, savedClasses, pastClasses } = useClassData();

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold mb-4 text-left">Your Classes</h2>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <ClassSection
          title="Upcoming Classes"
          classes={upcomingClasses}
          emptyMessage="No upcoming classes scheduled"
          viewAllPath="/student-dashboard/bookings"
        />

        <ClassSection
          title="Waitlisted Classes"
          classes={waitlistedClasses}
          emptyMessage="You're not on any waitlists"
          viewAllPath="/student-dashboard/waitlist"
        />
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <ClassSection
          title="Saved Classes"
          classes={savedClasses}
          emptyMessage="No saved classes yet"
          viewAllPath="/student-dashboard/saved"
        />

        <ClassSection
          title="Past Classes"
          classes={pastClasses}
          emptyMessage="No past classes"
          viewAllPath="/student-dashboard/bookings"
        />
      </div>
    </div>
  );
};

export default UserDashboardOverview;
