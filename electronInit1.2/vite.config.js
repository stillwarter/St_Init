const path = require('path');
const { defineConfig, loadEnv } = require('vite');
const vue = require('@vitejs/plugin-vue');

module.exports = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const port = Number(env.VITE_DEV_SERVER_PORT || 5173);

  return {
    root: path.resolve(__dirname, 'renderer'),
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'renderer', 'src')
      }
    },
    build: {
      outDir: path.resolve(__dirname, 'dist'),
      emptyOutDir: true
    },
    server: {
      port,
      strictPort: true
    }
  };
});
