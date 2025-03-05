
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DialogHeader, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface BookingDialogContentProps {
  type: string | null;
  title: string;
  description: string;
  selectedClass: {
    id: number;
    title: string;
    instructor: string;
  } | null;
  onClose: () => void;
}

const BookingDialogContent: React.FC<BookingDialogContentProps> = ({
  type,
  title,
  description,
  selectedClass,
  onClose,
}) => {
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleAction = () => {
    switch (type) {
      case "cancel":
        toast({
          title: t("booking.cancelSuccess"),
          description: t("booking.cancelDescription")
        });
        break;
      case "message":
        toast({
          title: t("message.success"),
          description: t("message.instructorSent")
        });
        break;
      case "promote":
        toast({
          title: t("booking.invitationSent"),
          description: t("booking.invitationDescription")
        });
        break;
      default:
        break;
    }
    onClose();
  };

  switch (type) {
    case "cancel":
      return (
        <>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              {t("booking.cancelPolicy")}
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={onClose}>
                {t("booking.keepBooking")}
              </Button>
              <Button variant="destructive" onClick={handleAction}>
                {t("booking.confirmCancel")}
              </Button>
            </div>
          </div>
        </>
      );
    case "message":
      return (
        <>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder={t("message.placeholder")} className="h-24" />
            <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleAction}>
              {t("message.send")}
            </Button>
          </div>
        </>
      );
    case "share":
      return (
        <>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">Twitter</Button>
              <Button variant="outline" className="w-full">Facebook</Button>
              <Button variant="outline" className="w-full">LinkedIn</Button>
              <Button variant="outline" className="w-full">{t("booking.copyLink")}</Button>
            </div>
          </div>
        </>
      );
    case "promote":
      return (
        <>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder={t("booking.emailPlaceholder")} />
            <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={handleAction}>
              {t("booking.sendInvitations")}
            </Button>
          </div>
        </>
      );
    default:
      return null;
  }
};

export default BookingDialogContent;
