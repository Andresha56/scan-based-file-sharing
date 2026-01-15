import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  resolve: {
    alias: {
      "@pages": path.resolve(__dirname, "src/pages"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@dialogs": path.resolve(__dirname, "src/dialogs"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@archetypes": path.resolve(__dirname, "src/archetypes"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@api": path.resolve(__dirname, "src/api"),
      "@query": path.resolve(__dirname, "src/query"),
      "@socket": path.resolve(__dirname, "src/socket"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@store": path.resolve(__dirname, "src/store"),
    },
  },
});
