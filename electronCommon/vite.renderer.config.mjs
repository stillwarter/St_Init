import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// https://vitejs.dev/config
export default defineConfig({
  
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3012",
        secure: false, // 允许HTTPS目标
        changeOrigin: true,
      },
    },
  },
});
