const path = require('path');
const { spawn } = require('child_process');
const waitOn = require('wait-on');
const chokidar = require('chokidar');

const root = path.join(__dirname, '..');

const { loadDevEnv, getDevServerPort } = require('../electron/config/dev-config');
// const { loadDevEnv, getDevServerPort } = require('./dev-config');

loadDevEnv();

const timeout = Number(process.env.WAIT_ON_TIMEOUT || 120000);
const interval = Number(process.env.WAIT_ON_INTERVAL || 200);

const port = getDevServerPort();
let child = null;
let watcher = null;
let restartTimer = null;
let isRestarting = false;
const filterDevtoolsNoise = process.env.FILTER_DEVTOOLS_NOISE !== '0';
const NOISE_PATTERNS = [/Autofill\.enable/i, /Autofill\.setAddresses/i, /Request Autofill\./i];

function isKnownNoise(line) {
  if (!filterDevtoolsNoise) return false;
  return NOISE_PATTERNS.some((pattern) => pattern.test(line));
}

function pipeWithFilter(stream, target) {
  if (!stream) return;
  stream.setEncoding('utf8');
  stream.on('data', (chunk) => {
    const lines = String(chunk).split(/\r?\n/);
    for (const line of lines) {
      if (!line) continue;
      if (isKnownNoise(line)) continue;
      target.write(`${line}\n`);
    }
  });
}

function spawnElectron() {
  const electronExe = require('electron');
  child = spawn(electronExe, ['.'], {
    cwd: root,
    stdio: ['inherit', 'pipe', 'pipe'],
    env: { ...process.env, NODE_ENV: 'development' }
  });
  pipeWithFilter(child.stdout, process.stdout);
  pipeWithFilter(child.stderr, process.stderr);

  child.on('exit', (code) => {
    // 如果是“自动重启”导致的退出，则由重启逻辑接手，不直接结束脚本
    if (!isRestarting) {
      process.exit(code ?? 0);
    }
  });

  child.on('error', (err) => {
    console.error('[开发启动调度器] Electron启动失败：', err);
    process.exit(1);
  });
}

function restartElectron() {
  if (!child) {
    spawnElectron();
    return;
  }
  if (isRestarting) return;

  isRestarting = true;
  const prev = child;
  child = null;

  console.log('[开发启动调度器] Detected electron code change, restarting Electron...');

  prev.once('exit', () => {
    isRestarting = false;
    spawnElectron();
  });

  // 优雅先停
  try {
    prev.kill('SIGTERM');
  } catch {
    // ignore
  }

  // 兜底：如果卡住，稍后强制重启（避免开发停摆）
  setTimeout(() => {
    if (isRestarting) {
      try {
        prev.kill('SIGKILL');
      } catch {
        // ignore
      }
      isRestarting = false;
      spawnElectron();
    }
  }, 7000);
}

function scheduleRestart() {
  if (restartTimer) clearTimeout(restartTimer);
  restartTimer = setTimeout(() => {
    restartTimer = null;
    restartElectron();
  }, 200);
}

waitOn({
  resources: [`tcp:${port}`],
  timeout,
  interval
})
  .then(() => {
    console.log(`[开发启动调度器] dev服务已就绪 tcp:${port}，启动 Electron...`);
    spawnElectron();

    const watchTargets = [path.join(root, 'electron')];
    watcher = chokidar.watch(watchTargets, {
      ignoreInitial: true,
      awaitWriteFinish: {
        stabilityThreshold: 120,
        pollInterval: 30
      }
    });
    console.log(`[开发启动调度器] watching: ${watchTargets.join(', ')}`);
    watcher.on('all', (event, filePath) => {
      if (!/\.(js|cjs|mjs)$/i.test(filePath)) return;
      console.log(`[开发启动调度器] ${event}: ${filePath}`);
      scheduleRestart();
    });
  })
  .catch((err) => {
    console.error(`[开发启动调度器] 等待端口启动失败 tcp:${port}.`, err);
    process.exit(1);
  });

function shutdown(signal) {
  if (watcher) {
    watcher.close();
    watcher = null;
  }
  if (child && !child.killed) {
    child.kill(signal);
  }
  process.exit(0);
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
