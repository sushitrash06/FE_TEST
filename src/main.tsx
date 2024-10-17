import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import {
  QueryClientProvider,
} from '@tanstack/react-query'
import './css/style.css';
import { queryClient } from "./query-client.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>

    <App />
    </QueryClientProvider>
  </StrictMode>
);
