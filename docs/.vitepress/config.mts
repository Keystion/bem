import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "BEM 方法论",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      {
        text: "快速上手",
        items: [
          { link: "/quick-start/", text: "快速上手" },
          { link: "/key-concepts/", text: "核心概念" },
          { link: "/naming-convention/", text: "命名约定" },
          { link: "/bem-for-css/", text: "CSS" },
          { link: "/bem-for-html/", text: "HTML" },
          { link: "/bem-for-js/", text: "JavaScript" },
          { link: "/filestructure/", text: "文件结构" },
          { link: "/redefinition-levels/", text: "重新定义级别" },
          { link: "/block-modification/", text: "块的修改" },
          { link: "/build/", text: "构建" },
          { link: "/declarations/", text: "声明" },
        ],
      },
      {
        text: "其他信息",
        items: [
          { text: "已解决的问题", link: "/solved-problems/" },
          { text: "历史", link: "/history/" },
          { text: "文章", link: "/articles/" },
          { text: "常见问题", link: "/faq/" },
        ],
      },
      { text: "Github", link: "https://github.com/Keystion/bem.info" },
    ],

    sidebar: [
      {
        link: "/quick-start/",
        text: "快速上手",
      },
      {
        link: "/key-concepts/",
        text: "核心概念",
      },
      {
        link: "/naming-convention/",
        text: "命名约定",
      },
      {
        link: "/bem-for-css/",
        text: "CSS",
      },
      {
        link: "/bem-for-html/",
        text: "HTML",
      },
      {
        link: "/bem-for-js/",
        text: "JavaScript",
      },
      {
        link: "/filestructure/",
        text: "文件结构",
      },
      {
        link: "/redefinition-levels/",
        text: "重新定义级别",
      },
      {
        link: "/block-modification/",
        text: "块的修改",
      },
      {
        link: "/build/",
        text: "构建",
      },
      {
        link: "/declarations/",
        text: "声明",
      },
      {
        link: "/solved-problems/",
        text: "已解决的问题",
      },
      {
        link: "/history/",
        text: "历史",
      },
      {
        link: "/articles/",
        text: "文章",
      },
      {
        link: "/faq/",
        text: "常见问题",
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/Keystion/bem" }],

    // footer
    footer: {
      message: "MIT Licensed.",
      copyright: "Copyright © 2018-present Webclown.net",
    },
  },
});
