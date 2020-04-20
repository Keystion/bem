module.exports = {
    title: 'BEM：Block、Element、Modifier',
    description: 'Just playing around',
    theme: '@vuepress/theme-default',
    themeConfig: {
        search: true,
        searchMaxSuggestions: 10,
        logo: 'https://webclown.net/favicon.ico',
        nav: [
            { text: '首页', link: '/' },
            { text: '快速上手', link: '/quick-start/' },
            { text: 'Github', link: 'https://github.com/Keystion/bem.info' },
        ],
        sidebar: [
            ['/', '首页'],
            ['/quick-start/', '快速上手'],
            ['/key-concepts/', 'key-concepts']
        ]
    }
}
