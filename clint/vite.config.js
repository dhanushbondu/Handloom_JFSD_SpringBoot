import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/users": "http://localhost:2020", // Backend server for user-related routes
      "/admin": "http://localhost:2020", // Backend server for admin routes
    },
  },
});
