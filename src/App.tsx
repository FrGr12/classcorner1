
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./Routes";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {router}
    </QueryClientProvider>
  );
}

export default App;
