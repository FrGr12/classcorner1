
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminModeToggle = () => {
  const [isAdminMode, setIsAdminMode] = useState(
    localStorage.getItem("admin_mode") === "true"
  );

  const toggleAdminMode = () => {
    const newMode = !isAdminMode;
    localStorage.setItem("admin_mode", newMode.toString());
    setIsAdminMode(newMode);
    toast.success(`Admin mode ${newMode ? "enabled" : "disabled"}`);
    
    // Reload the page to apply changes
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button 
        onClick={toggleAdminMode}
        className={`${isAdminMode ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold px-4 py-2 rounded shadow-lg`}
      >
        {isAdminMode ? 'Disable Admin Mode' : 'Enable Admin Mode'}
      </Button>
    </div>
  );
};

export default AdminModeToggle;
