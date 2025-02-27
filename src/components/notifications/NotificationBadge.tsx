
import { Badge } from "@/components/ui/badge";
import { useNotifications } from "@/hooks/useNotifications";

interface NotificationBadgeProps {
  className?: string;
}

const NotificationBadge = ({ className }: NotificationBadgeProps) => {
  const { notifications } = useNotifications();
  const unreadCount = notifications.filter(n => !n.read_at).length;
  
  if (unreadCount === 0) return null;
  
  return (
    <Badge 
      variant="default" 
      className={`bg-accent-purple h-5 w-5 flex items-center justify-center p-0 text-[10px] ${className || ''}`}
    >
      {unreadCount}
    </Badge>
  );
};

export default NotificationBadge;
