import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

const UserMessages = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Messages</h2>
        <MessageSquare className="w-5 h-5 text-neutral-400" />
      </div>
      <div className="space-y-4">
        <p className="text-sm text-neutral-600">No messages yet</p>
      </div>
    </Card>
  );
};

export default UserMessages;