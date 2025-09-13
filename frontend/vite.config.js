// Vite configuration enabling React and API proxying
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy API requests during development to avoid CORS issues
    proxy: {
      "/api": "http://localhost:4000",
    },
  },
});
