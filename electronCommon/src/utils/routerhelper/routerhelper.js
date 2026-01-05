// src/utils/routeHelper.js
import router from "@/router"; // 导入上面创建的路由实例

/**
 * 全局路由跳转工具
 * 支持：普通跳转、带 params/query 参数、替换历史、回退/前进、刷新页面
 */
const routeHelper = {
  /**
   * 普通跳转（新增历史记录，可回退）
   * @param {string|object} target - 跳转目标（路径字符串 或 {name, params, query}）
   * @example
   * routeHelper.push('/about')
   * routeHelper.push({ name: 'User', params: { id: 123 }, query: { type: 'info' } })
   */
  push: (target) => {
    if (typeof target === "string") {
      router.push(target);
    } else {
      router.push({
        name: target.name,
        params: target.params || {},
        query: target.query || {},
      });
    }
  },

  /**
   * 替换跳转（不新增历史记录，回退时跳过当前页）
   * @param {string|object} target - 跳转目标（同 push 用法）
   */
  replace: (target) => {
    if (typeof target === "string") {
      router.replace(target);
    } else {
      router.replace({
        name: target.name,
        params: target.params || {},
        query: target.query || {},
      });
    }
  },

  /**
   * 回退/前进（模拟浏览器前进后退）
   * @param {number} step - 步数（负数回退，正数前进，默认 -1）
   * @example
   * routeHelper.go(-1) // 回退1步
   * routeHelper.go(2)  // 前进2步
   */
  go: (step = -1) => {
    router.go(step);
  },

  /**
   * 快速回退（等价于 go(-1)）
   */
  back: () => {
    router.back();
  },

  /**
   * 快速前进（等价于 go(1)）
   */
  forward: () => {
    router.forward();
  },

  /**
   * 刷新当前页面（保留历史记录，重新加载路由）
   */
  refresh: () => {
    const currentRoute = router.currentRoute.value;
    router.replace({
      ...currentRoute,
      force: true, // 强制刷新（vue-router@4.1.0+ 支持）
    });
  },

  /**
   * 跳转到登录页（并记录当前路径，登录后可回跳）
   * @param {string} loginPath - 登录页路径（默认 '/login'）
   */
  toLogin: (loginPath = "/login") => {
    const currentPath = router.currentRoute.value.fullPath;
    // 存储当前路径到本地存储，登录后回跳
    localStorage.setItem("redirectPath", currentPath);
    router.replace(loginPath);
  },

  /**
   * 登录后回跳（从本地存储读取 redirectPath）
   */
  redirectAfterLogin: () => {
    const redirectPath = localStorage.getItem("redirectPath") || "/";
    localStorage.removeItem("redirectPath");
    router.push(redirectPath);
  },
};

export default routeHelper;
