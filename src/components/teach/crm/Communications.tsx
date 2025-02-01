import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UnifiedInbox from "./UnifiedInbox";
import MessageThread from "./MessageThread";
import ContactManagement from "./ContactManagement";

const Communications = () => {
  const [selectedThread, setSelectedThread] = useState<{
    id: string;
    studentId: string;
  } | null>(null);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="inbox" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
        </TabsList>

        <TabsContent value="inbox" className="space-y-4">
          <div className="grid grid-cols-12 gap-4">
            <div className={`${selectedThread ? "col-span-5" : "col-span-12"}`}>
              <UnifiedInbox onThreadSelect={setSelectedThread} />
            </div>
            {selectedThread && (
              <div className="col-span-7">
                <MessageThread
                  threadId={selectedThread.id}
                  studentId={selectedThread.studentId}
                />
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="contacts">
          <ContactManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Communications;