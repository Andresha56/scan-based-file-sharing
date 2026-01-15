import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { RoutesData } from "./routes/routes-data";
import { SocketProvider } from "@contexts/web-socket-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "./app";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <QueryClientProvider client={queryClient}>
        {/* <SocketProvider> */}
        <App />
        {/* </SocketProvider> */}
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
