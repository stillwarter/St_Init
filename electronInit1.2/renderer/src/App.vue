<template>
  <div class="app">
    <h1>Electron + Vue 3 Starter</h1>
    <p>现在是一个简单的 Electron + Vue3 + JS 项目骨架。</p>
    <button @click="handlePing">Ping 主进程</button>
    <p v-if="message">返回消息：{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      message: ''
    };
  },
  methods: {
    async handlePing() {
      if (window.electronApi?.ping) {
        this.message = await window.electronApi.ping();
      } else {
        this.message = 'electronApi 未注入（请通过 Electron 启动）。';
      }
    }
  }
};
</script>

<style>
body {
  margin: 0;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background: radial-gradient(circle at top left, #4f46e5, #020617);
  color: #e5e7eb;
}

button {
  padding: 8px 16px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background-color: #22c55e;
  color: #022c22;
  font-weight: 600;
}

button:hover {
  background-color: #16a34a;
}
</style>
