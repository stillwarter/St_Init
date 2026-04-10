const path = require('path');
const { defineConfig, loadEnv } = require('vite');
const vue = require('@vitejs/plugin-vue');
const vueDevTools = require('vite-plugin-vue-devtools');

module.exports = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const port = Number(env.VITE_DEV_SERVER_PORT || 5173);

  return {
    root: path.resolve(__dirname, 'renderer'),
    plugins: [vueDevTools(), vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'renderer', 'src')
      }
    },
    base: './',
    build: {
      outDir: path.resolve(__dirname, 'dist'),
      emptyOutDir: true,
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js'
        }
      }
    },
    server: {
      port,
      strictPort: true
    },
    build: {
      outDir: path.resolve(__dirname, 'dist'),
      emptyOutDir: true,
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js'
        }
      }
    }
  };
});
