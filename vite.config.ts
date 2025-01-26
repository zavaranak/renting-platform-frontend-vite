import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // "@components": path.resolve(__dirname, "src/components"),
      // "@hook": path.resolve(__dirname, "src/hook"),
      // "@store": path.resolve(__dirname, "src/store"),
      // "@lib": path.resolve(__dirname, "src/lib"),
      // "@assets": path.resolve(__dirname, "src/assets"),
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [react()],
  server: {
    proxy: {
      "/graphql": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false, // true if your backend is using https
      },
      "/storage": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false, // true if your backend is using https
      },
    },
  },
});
