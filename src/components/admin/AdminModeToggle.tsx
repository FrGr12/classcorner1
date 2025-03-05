
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
      console.log("AdminModeToggle: Preview mode detected, admin mode enabled automatically");
    }
    
    // Log the current state for debugging
    console.log("AdminModeToggle: Current admin mode:", localStorage.getItem("admin_mode"));
    console.log("AdminModeToggle: Is preview mode:", isPreview);
  }, []);

  const toggleAdminMode = () => {
    const newMode = !isAdminMode;
    
    // Set the mode in localStorage
    localStorage.setItem("admin_mode", newMode.toString());
    setIsAdminMode(newMode);
    
    // Show toast notification
    toast.success(`Admin mode ${newMode ? "enabled" : "disabled"}`);
    
    // Log the change
    console.log("AdminModeToggle: Admin mode changed to:", newMode);
    
    // Reload the page to apply changes immediately
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isPreviewMode && (
        <div className="mb-2 bg-yellow-100 border border-yellow-300 text-yellow-800 px-3 py-1 rounded text-sm font-medium">
          Preview Mode Active - Auth Bypassed
        </div>
      )}
      <div className={`mb-2 ${isAdminMode ? 'bg-green-100 border-green-300 text-green-800' : 'bg-red-100 border-red-300 text-red-800'} border px-3 py-1 rounded text-sm font-medium`}>
        Admin Mode: {isAdminMode ? 'Enabled' : 'Disabled'}
      </div>
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
