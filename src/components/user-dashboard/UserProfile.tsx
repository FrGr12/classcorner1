import { Card } from "@/components/ui/card";
import { User } from "lucide-react";

const UserProfile = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Profile</h2>
        <User className="w-5 h-5 text-neutral-400" />
      </div>
      <div className="space-y-4">
        <p className="text-sm text-neutral-600">Update your profile</p>
      </div>
    </Card>
  );
};

export default UserProfile;