
import { format } from "date-fns";
import { Message } from "./types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ReplyAll, MoreHorizontal, ArrowLeft, User, Copy, Archive, Trash2, Flag } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MessageDetailProps {
  selectedMessage: Message | null;
  onBack?: () => void;
}

export const MessageDetail = ({ selectedMessage, onBack }: MessageDetailProps) => {
  const [replyContent, setReplyContent] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleViewProfile = () => {
    if (selectedMessage?.profile) {
      navigate("/dashboard/contacts", {
        state: {
          selectedProfile: selectedMessage.profile,
          fromInbox: true
        }
      });
    }
  };

  const handleCopyMessage = () => {
    if (selectedMessage) {
      navigator.clipboard.writeText(selectedMessage.message_content);
      toast({
        title: "Copied",
        description: "Message content copied to clipboard",
      });
    }
  };

  const handleArchive = () => {
    toast({
      title: "Archived",
      description: "Message has been archived",
    });
  };

  const handleDelete = () => {
    toast({
      title: "Deleted",
      description: "Message has been deleted",
    });
  };

  const handleFlag = () => {
    toast({
      title: "Flagged",
      description: "Message has been flagged for follow-up",
    });
  };

  if (!selectedMessage) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground p-4 text-center text-xs sm:text-sm">
        Select a message to view details
      </div>
    );
  }

  return (
    <ScrollArea className="h-[600px]">
      <div className="p-3 sm:p-6 space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            {onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="md:hidden mr-1 h-8 w-8 p-0"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar
                    className="h-8 w-8 sm:h-10 sm:w-10 cursor-pointer"
                    onClick={handleViewProfile}
                  >
                    <AvatarImage src={selectedMessage.profile?.avatar_url || ""} />
                    <AvatarFallback className="text-xs sm:text-sm">
                      {selectedMessage.profile?.first_name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div>
              <h2 
                className="font-medium text-sm sm:text-base cursor-pointer hover:underline"
                onClick={handleViewProfile}
              >
                {selectedMessage.profile?.first_name} {selectedMessage.profile?.last_name}
              </h2>
              <p className="text-xs text-muted-foreground">
                {selectedMessage.communication_context || "Direct Message"}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleViewProfile} className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>View Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopyMessage} className="cursor-pointer">
                <Copy className="mr-2 h-4 w-4" />
                <span>Copy Message</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleFlag} className="cursor-pointer">
                <Flag className="mr-2 h-4 w-4" />
                <span>Flag for Follow-up</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleArchive} className="cursor-pointer">
                <Archive className="mr-2 h-4 w-4" />
                <span>Archive</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="cursor-pointer text-red-500 hover:text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="text-xs sm:text-sm text-muted-foreground">
          {format(new Date(selectedMessage.sent_at), "MMMM d, yyyy 'at' h:mm a")}
        </div>

        <div className="text-xs sm:text-sm border rounded-lg p-3 sm:p-4 bg-neutral-50">
          {selectedMessage.message_content}
        </div>

        <div className="pt-3 sm:pt-4 space-y-2">
          <Textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write a reply..."
            className="min-h-[100px] sm:min-h-[120px] text-xs sm:text-sm resize-none"
          />

          <div className="flex justify-end">
            <Button
              className="text-xs sm:text-sm bg-accent-purple hover:bg-accent-purple/90 text-white h-8 sm:h-10"
            >
              <ReplyAll className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              Reply
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};
