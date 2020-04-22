module.exports = {
    title: 'BEM 方法论',
    description: 'Just playing around',
    theme: '@vuepress/theme-default',
    themeConfig: {
        search: true,
        searchMaxSuggestions: 10,
        // displayAllHeaders: true,
        sidebarDepth: 3,
        nav: [
            { text: '首页', link: '/' },
            { text: '快速上手', link: '/quick-start/' },
            { text: 'Github', link: 'https://github.com/Keystion/bem.info' },
        ],
        sidebar: [
            ['/', '首页'],
            ['/quick-start/', '快速上手'],
            ['/key-concepts/', '核心概念'],
            ['/naming-convention/', '命名规则'],
            ['/bem-for-css/', 'CSS'],
            ['/bem-for-html/', 'HTML'],
            ['/bem-for-js/', 'JavaScript'],
            ['/filestructure/', '文件结构'],
            ['/redefinition-levels/', '重新定义级别'],
            ['/block-modification/', '块的修改'],
            ['/build/', '构建'],
            ['/declarations/', '声明']
        ]
    }
}
