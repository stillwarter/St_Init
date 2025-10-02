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
  ],
};
