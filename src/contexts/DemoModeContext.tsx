
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

interface DemoModeContextType {
  isDemoMode: boolean;
  enableDemoMode: () => void;
  disableDemoMode: () => void;
  toggleDemoMode: () => void;
}

const DemoModeContext = createContext<DemoModeContextType | undefined>(undefined);

export function DemoModeProvider({ children }: { children: ReactNode }) {
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);

  // Initialize demo mode from localStorage
  useEffect(() => {
    console.log("Checking localStorage for demo mode...");
    const savedDemoMode = localStorage.getItem("demoMode");
    if (savedDemoMode === "true") {
      console.log("Demo mode found in localStorage, enabling...");
      setIsDemoMode(true);
    } else {
      console.log("Demo mode not found in localStorage.");
    }
    setInitialized(true);
  }, []);

  const enableDemoMode = () => {
    console.log("Enabling demo mode...");
    setIsDemoMode(true);
    toast.info("Demo Mode enabled - all pages are accessible without login", {
      duration: 5000,
    });
    localStorage.setItem("demoMode", "true");
  };

  const disableDemoMode = () => {
    console.log("Disabling demo mode...");
    setIsDemoMode(false);
    toast.info("Demo Mode disabled - authentication required", {
      duration: 3000,
    });
    localStorage.removeItem("demoMode");
  };

  const toggleDemoMode = () => {
    if (isDemoMode) {
      disableDemoMode();
    } else {
      enableDemoMode();
    }
  };

  return (
    <DemoModeContext.Provider value={{ isDemoMode, enableDemoMode, disableDemoMode, toggleDemoMode }}>
      {children}
    </DemoModeContext.Provider>
  );
}

export function useDemoMode() {
  const context = useContext(DemoModeContext);
  if (context === undefined) {
    throw new Error("useDemoMode must be used within a DemoModeProvider");
  }
  return context;
}
