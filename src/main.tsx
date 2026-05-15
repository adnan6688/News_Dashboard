import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { router } from "./router/router.tsx";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./Context/AuthProvider.tsx";



const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      
      <AuthProvider>

        <RouterProvider router={router} />

        <Toaster position="top-right" reverseOrder={false} />

      </AuthProvider>

    </QueryClientProvider>
  </StrictMode>
);