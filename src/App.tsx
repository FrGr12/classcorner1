
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import router from "./Routes";
import { Toaster } from "sonner";
import { DemoModeProvider } from "./contexts/DemoModeContext";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DemoModeProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </DemoModeProvider>
    </QueryClientProvider>
  );
}

export default App;
