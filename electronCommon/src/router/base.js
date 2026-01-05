export const baseRouter = {
  path: "/",
  name: "home",
  component: () => import("@/layout/layout.vue"),
  children: [
    {
      path: "main",
      name: "main",
      component: () => import("@/views/index.vue"),
      meta: {
        title: "主页",
      },
    },
    {
      path: "tempfiledemo",
      name: "tempfiledemo",
      component: () => import("@/views/tempfiledemo/tempfiledemo.vue"),
      meta: {
        title: "临时文件demo",
      },
    },
  ],
};
