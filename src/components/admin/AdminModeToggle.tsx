
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminModeToggle = () => {
  const [isAdminMode, setIsAdminMode] = useState(
    localStorage.getItem("admin_mode") === "true"
  );
  
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  
  useEffect(() => {
    // Check if we're in a preview environment
    const isPreview = window.location.hostname.includes('stackblitz') || 
                      window.location.hostname.includes('codesandbox') ||
                      window.location.hostname.includes('vercel.app') ||
                      window.location.hostname.includes('netlify.app');
                      
    setIsPreviewMode(isPreview);
    
    // In preview mode, automatically enable admin mode if not already set
    if (isPreview && localStorage.getItem("admin_mode") !== "true") {
      localStorage.setItem("admin_mode", "true");
      setIsAdminMode(true);
    }
  }, []);

  const toggleAdminMode = () => {
    const newMode = !isAdminMode;
    
    // Set the mode in localStorage
    localStorage.setItem("admin_mode", newMode.toString());
    setIsAdminMode(newMode);
    
    // Show toast notification
    toast.success(`Admin mode ${newMode ? "enabled" : "disabled"}`);
    
    // Reload the page to apply changes immediately
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isPreviewMode && (
        <div className="mb-2 bg-yellow-100 border border-yellow-300 text-yellow-800 px-3 py-1 rounded text-sm font-medium">
          Preview Mode Active
        </div>
      )}
      <Button 
        onClick={toggleAdminMode}
        className={`${isAdminMode ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold px-4 py-2 rounded shadow-lg`}
        size="lg"
      >
        {isAdminMode ? 'Disable Admin Mode' : 'Enable Admin Mode'}
      </Button>
    </div>
  );
};

export default AdminModeToggle;
