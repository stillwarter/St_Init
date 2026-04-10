const path = require('path');
const dotenv = require('dotenv');

const root = path.join(__dirname, '..', '..');

function loadDevEnv() {
  // 按约定：优先使用 .env.development（团队共享），再用 .env.local 覆盖（个人本地配置）
  dotenv.config({ path: path.join(root, '.env.development') });
  dotenv.config({ path: path.join(root, '.env.local'), override: true });
}

function getDevServerUrl() {
  const fallbackPort = Number(process.env.VITE_DEV_SERVER_PORT || 5173);
  const fromUrl = process.env.DEV_SERVER_URL;
  if (!fromUrl) return `http://localhost:${fallbackPort}`;

  try {
    const url = new URL(fromUrl);
    // 若 URL 未显式带端口，回退到 VITE_DEV_SERVER_PORT
    const port = url.port ? Number(url.port) : fallbackPort;
    // 重新拼一次，避免端口空字符串导致后续 wait 逻辑拿不到端口
    url.port = String(port);
    return url.toString();
  } catch {
    console.warn(
      '[dev-config] Invalid DEV_SERVER_URL, fallback to http://localhost:VITE_DEV_SERVER_PORT'
    );
    return `http://localhost:${fallbackPort}`;
  }
}

function getDevServerPort() {
  const url = getDevServerUrl();
  try {
    return Number(new URL(url).port || process.env.VITE_DEV_SERVER_PORT || 5173);
  } catch {
    return Number(process.env.VITE_DEV_SERVER_PORT || 5173);
  }
}

module.exports = {
  loadDevEnv,
  getDevServerUrl,
  getDevServerPort
};
