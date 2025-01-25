import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/users": "http://localhost:2020", 
      "/products": "http://localhost:2020",
      "/admin":"http://localhost:2020",
      "/cart":"http://localhost:2020",
      "/payment":"http://localhost:2020",

    },
  },
});
