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
            { 
                text: '快速上手',
                items: [
                    { link: '/quick-start/', text: '快速上手' },
                    { link: '/key-concepts/', text: '核心概念' },
                    { link: '/naming-convention/', text: '命名约定' },
                    { link: '/bem-for-css/', text: 'CSS' },
                    { link: '/bem-for-html/', text: 'HTML' },
                    { link: '/bem-for-js/', text: 'JavaScript' },
                    { link: '/filestructure/', text: '文件结构' },
                    { link: '/redefinition-levels/', text: '重新定义级别' },
                    { link: '/block-modification/', text: '块的修改' },
                    { link: '/build/', text: '构建' },
                    { link: '/declarations/', text: '声明' }
                ]
            },
            {
                text: '其他信息',
                items: [
                    { text: '已解决的问题', link: '/solved-problems/' },
                    { text: '历史', link: '/history/' },
                    { text: '文章', link: '/articles/' },
                    { text: '常见问题', link: '/faq/' }
                ]
            },
            { text: 'Github', link: 'https://github.com/Keystion/bem.info' },
        ],
        sidebar: [
            ['/quick-start/', '快速上手'],
            ['/key-concepts/', '核心概念'],
            ['/naming-convention/', '命名约定'],
            ['/bem-for-css/', 'CSS'],
            ['/bem-for-html/', 'HTML'],
            ['/bem-for-js/', 'JavaScript'],
            ['/filestructure/', '文件结构'],
            ['/redefinition-levels/', '重新定义级别'],
            ['/block-modification/', '块的修改'],
            ['/build/', '构建'],
            ['/declarations/', '声明'],
            ['/solved-problems/', '已解决的问题'],
            ['/history/', '历史'],
            ['/articles/', '文章'],
            ['/faq/', '常见问题']
        ]
    }
}
