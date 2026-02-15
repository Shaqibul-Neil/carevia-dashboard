import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import router from "./routes/router";
import AuthProvider from "./context/AuthProvider";
import ThemeProvider from "./context/ThemeProvider";
import { Toaster } from "sonner";
import SocketProvider from "./context/SocketProvider";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <SocketProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <RouterProvider router={router}></RouterProvider>
            <Toaster richColors closeButton />
          </ThemeProvider>
        </QueryClientProvider>
      </SocketProvider>
    </AuthProvider>
  </StrictMode>,
);
