import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://teleconsultation.ioncosolutions.com:3000",
      // "/api": "http://localhost:3000",
      // "/api": "process.env.VITE_API_URL",
    },
  },
});
