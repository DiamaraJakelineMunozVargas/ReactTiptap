import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  server: {
    proxy: {
      "/pacientes": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/plantillas": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/reportes": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});