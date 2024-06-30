# 核心概念

- [核心概念](#核心概念)
  - [块](#块)
    - [块特征](#块特征)
      - [嵌套结构](#嵌套结构)
      - [任意位置](#任意位置)
      - [重用](#重用)
  - [元素](#元素)
  - [修饰符](#修饰符)
  - [BEM 实体](#bem-实体)
  - [混合](#混合)
  - [BEM 树](#bem-树)
  - [块的实施方案](#块的实施方案)
  - [实现技术](#实现技术)
  - [块重新定义](#块重新定义)
  - [重新定义级别](#重新定义级别)

## 块

一个逻辑上和功能上独立的页面组件，相当于Web Components中的组件。一个块封装了行为（JavaScript）、模板、样式（CSS）和其他[实现技术](#实现技术)。块是独立的，这使得它们可以重复使用，同时也方便了[项目的开发和支持过程](/solved-problems/)。

### 块特征

#### 嵌套结构

区块可以嵌套在任何其他区块中。

例如：一个 `head` 块可以包括一个标志块（`logo`）、一个搜索表单块（`search`）和一个授权块（`auth`）。

![头块组件](/key-concepts/key-concepts__head_marked.png)

#### 任意位置

块可以在页面上移动，在页面或项目之间移动。将区块作为独立的实体来实现，使其在页面上的位置变化成为可能，并确保其正常运行和外观。

因此，标志和授权表单可以在不修改 CSS 或 JavaScript 代码的区块的基础上进行互换。

![Altering the block positions](/key-concepts/key-concepts__head.png)

![Altering the block positions](/key-concepts/key-concepts__head_changed.png)

#### 重用

一个接口可以包含同一个块的多个实例。

![网上商店的产品](/key-concepts/key-concepts__goods-list.png)

## 元素

[块](#块)的一个组成部分，不能在块之外使用。

例如：一个菜单项不能在菜单块的上下文之外使用，因此它是一个元素。

![菜单项目](/key-concepts/key-concepts__menu-items.png)

> [一个块还是一个元素：什么时候该用哪个？](/faq/#a-block-or-an-element-which-one-should-i-create)

## 修饰符

定义了一个[块](#块)或[元素](#元素)的外观和行为的 BEM 实体。

修饰符的使用是可选的。

修饰符本质上类似于HTML属性。由于使用了修饰符，同一个块的外观会有所不同。

例如：菜单块（`菜单`）的外观可能会因使用了修饰符而改变。

![在页脚添加一个菜单](/key-concepts/key-concepts__site-footer-menu.png)

修改符可以在运行时改变（例如：作为对块的DOM事件的反应），或者通过其他块来改变。

例如：如果用户点击签到按钮时输入了错误的凭证（"click"DOM事件），那么 "visible" 修改符就会被设置在一个隐藏的块上，并带有错误信息。

## BEM 实体

[块（Blocks）](#block)、[元素（elements）](#element)和 [修饰符（modifiers）](#modifier) 都称之为 BEM 实体.

它是一个概念，既可以用来指单个的BEM实体，也可以作为块、元素和修饰符的总称。

## 混合

在一个[DOM节点](https://en.wikipedia.org/wiki/Document_Object_Model)上托管不同的[BEM 实体](#bem-实体)的实例。

混合体使我们能够：

* 结合多个BEM实体的行为和风格，同时避免代码重复。
* 在现有BEM实体的基础上创建新的语义上的接口组件。

让我们考虑由一个块和另一个块的元素组成的混合体的情况。

让我们假设你的项目中的链接是通过一个 "link "块来实现的。我们需要将菜单项格式化为链接。有几种方法可以做到这一点。

* 为一个菜单项创建一个修改器，将该项变成链接。实现这样的修改器必然需要复制 `link` 块的行为和样式。这将导致代码的重复。
* 将通用的 `link` 块和 `menu` 块的 `link` 元素混合在一起。混合使用这两个BEM实体将使我们能够使用 `link` 块的基本链接功能和 `ment` 块的附加CSS规则，而无需复制代码。

## BEM 树

用块、元素和修饰符来表示网页结构。它是对[DOM树](https://en.wikipedia.org/wiki/Document_Object_Model)的抽象，描述了BEM实体的名称、状态、顺序、嵌套和辅助数据。

在实际项目中，BEM树可以以任何支持树状结构的格式呈现。

让我们考虑一个DOM树的例子：

```html
<header class="header">
    <img class="logo">
    <form class="search-form">
        <input class="input">
        <button class="button"></button>
    </form>
    <ul class="lang-switcher">
        <li class="lang-switcher__item">
            <a class="lang-switcher__link" href="url">en</a>
        </li>
        <li class="lang-switcher__item">
            <a class="lang-switcher__link" href="url">ru</a>
        </li>
    </ul>
</header>
```

对应的BEM树将是这样的：

```files
header
    logo
    search-form
        input
        button
    lang-switcher
        lang-switcher__item
            lang-switcher__link
        lang-switcher__item
            lang-switcher__link
```

在 XML 和 [BEMJSON](https://github.com/bem/bem-xjst/blob/master/docs/en/4-data.md) 格式中，相同的BEM树将显示如下：

XML

```xml
<block:header>
    <block:logo/>
    <block:search-form>
        <block:input/>
        <block:button/>
    </block:search-form>
    <block:lang-switcher>
        <elem:item>
            <elem:link/>
        </elem:item>
        <elem:item>
            <elem:link/>
        </elem:item>
    </block:lang-switcher>
</block:header>
```

BEMJSON

```js
{
    block: 'header',
    content : [
        { block : 'logo' },
        {
            block : 'search-form',
            content : [
                { block : 'input' },
                { block : 'button' }
            ]
        },
        {
            block : 'lang-switcher',
            content : [
                {
                    elem : 'item',
                    content : [
                        { elem : 'link' }
                    ]
                },
                {
                    elem : 'item',
                    content : [
                        { elem : 'link' }
                    ]
                }
            ]
        }
    ]
}
```

## 块的实施方案

一组不同的[技术](#实现技术)，决定了BEM实体的以下几个方面

* 行为
* 外观
* 测试
* 模板
* 文档
* 附属关系的描述
* 额外的数据（例如：图像）。

## 实现技术

用于[实现](#block-implementation)块的技术。

块可以用一种或多种技术来实现，例如：

* 行为 - JavaScript, CoffeeScript
* 外观 - CSS, Stylus, Sass, Sass
* 模板 - BEMHTML, BH, Pug, Handlebars, XSL
* 文档 - Markdown, Wiki, XML。

例如：如果一个块的外观是用CSS定义的，那就意味着这个块是用CSS技术实现的。同样，如果一个块的文档是用Markdown格式编写的，那么这个块也是用Markdown技术实现的。

## 块重新定义

通过在不同[级别](#重新定义级别)上增加新的功能来修改一个区块的[实施方案](#块的实施方案)。

## 重新定义级别

一套BEM实体及其部分[实施方案](#块的实施方案)；

块的最终实现可以分为不同的重新定义级别。每个新的级别都扩展或覆盖了块的原始实现。最终的结果是由所有重新定义级别的块的各个[实现技术](#实现技术)按预定的连续顺序从块的各个实现技术中组装而成。

![重新定义级别](/key-concepts/key-concepts__levels.png)

BEM实体的任何[实现技术](#实现技术)都可以[重新定义](#块重新定义)。

例如：有一个第三方库，在一个单独的级别上链接到项目中的第三方库。该库包含了现成的块的实施方案。特定于项目的块存储在不同的重新定义层上。

假设我们需要修改其中一个库块的外观。这不需要在库源码中改变该块的CSS规则，也不需要在项目级复制代码。我们只需要在项目级为该块创建额外的CSS规则即可。在构建过程中，所产生的实现将包含库级的原始规则和项目级的新样式。
