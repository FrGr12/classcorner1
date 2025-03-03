
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";

interface GuestBookingFormProps {
  guestEmail: string;
  firstName: string;
  lastName: string;
  setGuestEmail: (value: string) => void;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const GuestBookingForm = ({
  guestEmail,
  firstName,
  lastName,
  setGuestEmail,
  setFirstName,
  setLastName
}: GuestBookingFormProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input 
          id="email"
          type="email"
          placeholder="Enter your email"
          value={guestEmail}
          onChange={(e) => setGuestEmail(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="firstName">First name</Label>
        <Input 
          id="firstName"
          placeholder="Enter your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Last name</Label>
        <Input 
          id="lastName"
          placeholder="Enter your last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <Alert>
        <AlertDescription className="text-sm">
          You'll receive an email with instructions to create your account and complete the booking process.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default GuestBookingForm;
