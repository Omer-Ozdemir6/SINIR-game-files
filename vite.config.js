import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Capacitor'a alırken: build çıktısı dist/ → capacitor.config'te webDir: "dist"
  server: { host: true },
});
