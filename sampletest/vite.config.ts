import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://192.168.22.245:3000", // Backend address
        changeOrigin: true,
        secure: false, // If HTTPS is not enabled on the backend
      },
    },
  },
});
