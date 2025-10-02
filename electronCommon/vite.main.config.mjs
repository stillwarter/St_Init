import { defineConfig } from "vite";

// https://vitejs.dev/config
export default defineConfig({
  build: {
    sourcemap: process.env.NODE_ENV === "production", // 仅生产环境生成完整 Source Map
  },
});
