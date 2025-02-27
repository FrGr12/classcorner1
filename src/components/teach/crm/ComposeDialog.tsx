import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface ComposeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: string;
  setRecipient: (value: string) => void;
  messageSubject: string;
  setMessageSubject: (value: string) => void;
  messageContent: string;
  setMessageContent: (value: string) => void;
  onSend: () => void;
  contacts: any[];
}
export const ComposeDialog = ({
  isOpen,
  onClose,
  recipient,
  setRecipient,
  messageSubject,
  setMessageSubject,
  messageContent,
  setMessageContent,
  onSend,
  contacts
}: ComposeDialogProps) => {
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="text-left">Write New Message</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="recipient" className="text-sm">Recipient</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Input id="recipient" placeholder="Search contacts..." value={recipient} className="text-sm" />
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Search contacts..." />
                  <CommandEmpty>No contacts found.</CommandEmpty>
                  <CommandGroup>
                    {contacts?.map(contact => <CommandItem key={contact.id} value={`${contact.first_name} ${contact.last_name}`} onSelect={value => {
                    setRecipient(value);
                  }} className="flex items-center gap-2 p-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={contact.avatar_url || ""} />
                          <AvatarFallback>
                            {contact.first_name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span>{contact.first_name} {contact.last_name}</span>
                          <span className="text-xs text-muted-foreground">
                            {contact.email}
                          </span>
                        </div>
                      </CommandItem>)}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="subject" className="text-sm">Subject</Label>
            <Input id="subject" placeholder="Enter message subject" value={messageSubject} onChange={e => setMessageSubject(e.target.value)} className="text-sm" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message" className="text-sm">Message</Label>
            <Textarea id="message" placeholder="Type your message here..." value={messageContent} onChange={e => setMessageContent(e.target.value)} className="min-h-[200px] text-sm" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline" className="text-sm">
            Cancel
          </Button>
          <Button onClick={onSend} className="gap-2 text-sm bg-accent-purple">
            <Send className="h-4 w-4" />
            Send Message
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>;
};