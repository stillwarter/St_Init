/**
 * @returns {boolean} 是否为开发环境
 */
export function isDevelopment() {
  return process.env.NODE_ENV === "development" || !app.isPackaged;
}
