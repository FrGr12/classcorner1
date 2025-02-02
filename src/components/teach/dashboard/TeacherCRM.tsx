import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizableGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import ContactManagement from "../crm/ContactManagement";
import MessageThread from "../crm/MessageThread";
import ContactProfileView from "../crm/ContactProfileView";

const TeacherCRM = () => {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);

  return (
    <div className="h-[calc(100vh-4rem)]">
      <ResizableGroup direction="horizontal">
        {/* Left Panel - Contact List */}
        <ResizablePanel defaultSize={25} minSize={20}>
          <div className="h-full border-r">
            <ScrollArea className="h-full">
              <ContactManagement 
                onContactSelect={setSelectedContactId}
                selectedContactId={selectedContactId}
              />
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Middle Panel - Message Threads */}
        <ResizablePanel defaultSize={40}>
          <div className="h-full border-r">
            <ScrollArea className="h-full">
              {selectedContactId && (
                <MessageThread
                  threadId={selectedThreadId || selectedContactId}
                  studentId={selectedContactId}
                />
              )}
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle />

        {/* Right Panel - Contact Details */}
        <ResizablePanel defaultSize={35}>
          <div className="h-full">
            <ScrollArea className="h-full">
              {selectedContactId && (
                <ContactProfileView
                  contactId={selectedContactId}
                  onClose={() => setSelectedContactId(null)}
                />
              )}
            </ScrollArea>
          </div>
        </ResizablePanel>
      </ResizableGroup>
    </div>
  );
};

export default TeacherCRM;