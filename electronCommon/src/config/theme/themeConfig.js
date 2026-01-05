import { theme } from "ant-design-vue";
const { defaultAlgorithm, darkAlgorithm } = theme;

/**
 * 生成 Antdv 主题配置
 * @param mode 主题模式（light/dark）
 * @returns ThemeConfig
 */
export const getThemeConfig = (mode) => {
  return {
    algorithm: mode === "dark" ? darkAlgorithm : defaultAlgorithm,
  };
};
