
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useSidebarContext } from "@/contexts/SidebarContext";

const DashboardHeader = () => {
  const { toggle } = useSidebarContext();

  return (
    <header className="h-16 border-t bg-white flex items-center px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={toggle}
      >
        <Menu className="h-6 w-6" />
      </Button>
      <div className="ml-4 lg:ml-0">
        <h1 className="text-xl font-semibold">Teacher Dashboard</h1>
      </div>
    </header>
  );
};

export default DashboardHeader;
