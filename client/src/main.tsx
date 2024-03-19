import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./components/Layout.tsx";
import { UserState } from "./context/UserState.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <UserState>
        <RouterProvider router={router} />
      </UserState>
    </React.StrictMode>
  </QueryClientProvider>
);
