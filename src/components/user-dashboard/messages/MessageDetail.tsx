
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message } from "./types";
import { MessageDetailSkeleton } from "./MessagesSkeleton";

interface MessageDetailProps {
  selectedMessage: Message | null;
  isLoading: boolean;
}

export const MessageDetail = ({ selectedMessage, isLoading }: MessageDetailProps) => {
  if (isLoading) {
    return <MessageDetailSkeleton />;
  }

  if (!selectedMessage) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Select a message to view details
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <Avatar className="h-10 w-10">
          <AvatarImage src={selectedMessage.profile?.avatar_url || ""} />
          <AvatarFallback>
            {selectedMessage.profile?.first_name?.[0] || "T"}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold">
            {selectedMessage.profile?.first_name} {selectedMessage.profile?.last_name}
          </h2>
          <p className="text-sm text-muted-foreground">
            {selectedMessage.communication_context}
          </p>
        </div>
      </div>
      <div className="prose max-w-none">
        <div className="bg-muted p-4 rounded-lg">
          {selectedMessage.message_content}
        </div>
      </div>
      <div className="mt-6">
        <Textarea
          placeholder="Type your reply..."
          className="min-h-[100px]"
        />
        <div className="flex justify-end mt-2">
          <Button className="bg-[#6E44FF] hover:bg-[#6E44FF]/90 text-white">
            Send Reply
          </Button>
        </div>
      </div>
    </div>
  );
};
