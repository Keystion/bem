# 快速上手

## 介绍

BEM（Block，Element，Modifier）是一种基于组件的Web开发方法。它背后的思想是将用户界面划分成独立的块。这使得界面开发变得简单而快速，即使是复杂的用户界面，它也可以重复使用现有的代码而不需要复制和粘贴。

## 内容

* [块（Block）](#块（block）)
* [元素（Element）](#元素（element）)
* [我应该创建一个区块（Block）还是元素（Element）？](#我应该创建一个区块（block）还是元素（element）？)
* [修饰符（Modifier）](#修饰符（modifier）)
* [混合（Mix）](#混合（mix）)
* [文件结构（file-structure）](#文件结构（file-structure）)

## 块（Block）

一个功能独立的页面组件，可以重复使用。在HTML中，块用 `class` 属性表示。

特征：

* [块名](/naming-convention#块名称)描述它的目的（“它是什么？” - `menu` 或 `button`），而不是它的状态（“它看起来像什么？” - `red` 或 `big`）。

**例子**

```html
<!-- 正确。`error` 块在语义上是有意义的 -->
<div class="error"></div>

<!-- 不正确。它描述的是外观 -->
<div class="red-text"></div>
```

* 块不应该影响它的环境，这意味着你不应该为块设置外部几何体（margin）或定位。
* 在使用BEM时，你也不应该使用CSS标签或`ID`选择器。

这样可以确保在重用块或将块从一个地方移动到另一个地方的必要独立性。

### 块（Blocks）的使用指南

#### 嵌套（Nesting）

* 块之间可以相互嵌套。
* 你可以有任意数量的嵌套级别。

**例子**

```html
<!-- `header` 块 -->
<header class="header">
    <!-- 嵌套的 `logo` 块 -->
    <div class="logo"></div>

    <!-- 嵌套的 `search-form` 块 -->
    <form class="search-form"></form>
</header>
```

## 元素（Element）

块的复合部分，不能与之分开使用。

特征:

* [元素名称](/naming-convention#元素名称)描述的是它的目的（「这是什么？」-- `项` 、 `文本` 等），而不是它的状态（「什么类型，或者说它是什么样子的？」-- `red`、`big` 等）。
* 元素全名的结构是 `block-name__element-name`。元素名与块名之间用双下划线(__)分隔。

**例子**

```html
<!-- `search-form` block -->
<form class="search-form">
    <!-- `input` element in the `search-form` block -->
    <input class="search-form__input">

    <!-- `button` element in the `search-form` block -->
    <button class="search-form__button">Search</button>
</form>
```

### 元素（element）的使用指南

* [元素嵌套（Nesting）](#元素嵌套（nesting）)
* [成员（Membership）](#成员（membership）)
* [选择性（Optionality）](#选择性（optionality）)

#### 元素嵌套（Nesting）

* 元素（Elements）之间可以相互嵌套。
* 你可以有任意数量的嵌套级别。
* 元素永远是块的一部分，而不是另一个元素。这意味着元素名称不能定义一个层次结构，比如 `block__elem1__elem2` 。

**例子**

```html
<!--
    正确。完整元素名称的结构遵循以下模式：
    `block-name__element-name`
-->
<form class="search-form">
    <div class="search-form__content">
        <input class="search-form__input">

        <button class="search-form__button">Search</button>
    </div>
</form>

<!--
    不正确。完整元素名称的结构不符合模式：
    `block-name__element-name`
-->
<form class="search-form">
    <div class="search-form__content">
        <!-- 推荐: `search-form__input` 或 `search-form__content-input` -->
        <input class="search-form__content__input">

        <!-- 推荐: `search-form__button` 或 `search-form__content-button` -->
        <button class="search-form__content__button">Search</button>
    </div>
</form>
```

块名定义了命名空间，[保证](/naming-convention#element-name) 了元素对块的依赖性（`block__elem`）。

一个块可以在DOM树上有一个元素的嵌套结构:

**例子**

```html
<div class="block">
    <div class="block__elem1">
        <div class="block__elem2">
            <div class="block__elem3"></div>
        </div>
    </div>
</div>
```

然而，在BEM方法中，这种块状结构总是以元素的平面列表的形式表示:

**例子**

```css
.block {}
.block__elem1 {}
.block__elem2 {}
.block__elem3 {}
```

这允许你改变一个块的DOM结构，而不需要对每个独立元素的代码进行修改。:

**例子**

```html
<div class="block">
    <div class="block__elem1">
        <div class="block__elem2"></div>
    </div>

    <div class="block__elem3"></div>
</div>
```

块的结构发生了变化，但元素及其名称的规则不变。

#### 成员（Membership）

元素（Element）**始终是块（Block）的一部分**，你不应该把它和块分开使用。

**例子**

```html
<!-- 正确。元素位于 `search-form` 块内 -->
<!-- `search-form` 块 -->
<form class="search-form">
    <!-- `search-form` 块中的 `input` -->
    <input class="search-form__input">

    <!-- `search-form` 块中的 `button` -->
    <button class="search-form__button">Search</button>
</form>

<!--
    不正确. 元素位于 `search-form` 块的上下文之外。
-->
<!-- `search-form` 块 -->
<form class="search-form">
</form>

<!-- `search-form` 块中的 `input` 元素 -->
<input class="search-form__input">

<!-- `search-form` 块中的 `button` 元素-->
<button class="search-form__button">Search</button>
```

#### 选择性（Optionality）

元素是一个可选的块组件。不是所有的块都有元素。

**例子**

```html
<!-- `search-form` 块 -->
<div class="search-form">
    <!-- `input` 块 -->
    <input class="input">

    <!-- `button` 块 -->
    <button class="button">Search</button>
</div>
```

## 我应该创建一个区块（Block）还是元素（Element）？


### 创建一个区块

如果一段代码可能会被重用，并且它不依赖于其他页面组件的实现。

### 创建一个元素

如果一段代码不能脱离父实体（块）而单独使用。

为了简化开发，必须将元素分成较小的部分（子元素），这是一个例外。在BEM方法论中，[你不能创建元素中的元素](#嵌套（nesting-1）)。在这种情况下，你需要创建一个服务块，而不是创建一个元素。

## 修饰符（Modifier）

定义了一个块或元素的外观、状态或行为的实体。

特征:

* [修饰符名称](/naming-convention#块的修饰符名称)描述了它的外观（“什么大小？”或 “哪个主题？” 等--`size_s`或 `theme_islands`）、状态（“它和其他的有什么不同？”--`disabled`、`focus`等）和行为（“它的行为如何？”或“它是如何响应用户的？” - 如 `directions_left-top`）。)
* 修饰符名称与块或元素名称之间用一个下划线(`_`)隔开。

### 修饰符类型

#### 布尔（Boolean）

当只有修饰符的存在或不存在是重要的，其值无关紧要时使用。例如，`disabled`。如果存在一个布尔型修饰符，其值被认为是 `true`。

* 修饰符的全称的结构遵循着这样的规律：

  * `block-name_modifier-name`
  * `block-name__element-name_modifier-name`

**例子**

```html
<!-- `search-form` 块有 `focused` 布尔修饰符。 -->
<form class="search-form search-form_focused">
    <input class="search-form__input">

    <!-- `button` 元素具有 `disabled` 布尔修改器 -->
    <button class="search-form__button search-form__button_disabled">Search</button>
</form>
```

#### 键-值（Key-value）


* 当修改器值很重要时使用。例如，“以 `islands` 为设计主题的菜单”：`menu_theme_islands`。
* 修饰符的全称的结构遵循这个模式：

  * `block-name_modifier-name_modifier-value`
  * `block-name__element-name_modifier-name_modifier-value`

**例子**

```html

<!-- `search-form` 块有 `theme` 修饰符，值为 `islands` -->
<form class="search-form search-form_theme_islands">
    <input class="search-form__input">

    <!-- `button` 元素有 `size` 修改符，其值为 `m` -->
    <button class="search-form__button search-form__button_size_m">Search</button>
</form>

<!-- 你不能同时使用两个相同的修饰符，但值不同的修饰符也不能同时使用 -->
<form class="search-form
             search-form_theme_islands
             search-form_theme_lite">

    <input class="search-form__input">

    <button class="search-form__button
                   search-form__button_size_s
                   search-form__button_size_m">
        Search
    </button>
</form>
```

### 修饰符（Modifiers）的使用指南

#### 修饰符不能单独使用

从BEM的角度来看，修饰符不能脱离被修改的块或元素单独使用。修饰符应该改变实体的外观、行为或状态，而不是取代它。

**例子**

```html
<!--
    正确. `search-form`块有 `theme` 修饰符，值为"islands"。
-->
<form class="search-form search-form_theme_islands">
    <input class="search-form__input">

    <button class="search-form__button">Search</button>
</form>

<!-- 不正确. 缺少修改后的 class `search-form` -->
<form class="search-form_theme_islands">
    <input class="search-form__input">

    <button class="search-form__button">Search</button>
</form>
```

> [为什么要把块名写在修饰符和元素名称中？](../../faq/faq#why-include-the-block-name-in-modifier-and-element-names)

## 混合（Mix）

在一个DOM节点上使用不同的BEM实体的技术。

混合允许：

* 结合多个实体的行为和风格，无需重复代码。
* 在现有的基础上创建新的UI组件。

**例子**

```html
<!-- `header` 块 -->
<div class="header">
    <!--
        `search-form` 块与 `header` 块中的 `search-form` 元素混合在一起
    -->
    <div class="search-form header__search-form"></div>
</div>
```

在这个例子中，我们将 "search-form" 块和 "header" 块中的 "search-form" 元素的行为和样式结合在一起。

这种方法允许我们在 `header__search-form` 元素中设置外部的几何形状和定位，而 `search-form` 块本身仍然是通用的。

因此，我们可以在任何其他环境中使用该块，因为它没有指定任何padding。这就是为什么我们可以把它叫做独立的原因。

## 文件结构（file-structure）

BEM方法中采用的组件方法同样适用于[文件结构中的项目](/filestructure/#file-structure-organization)。块、元素和修改器的实现方式被划分为独立的技术文件，也就是说我们可以将它们单独连接起来。

特征:

* 一个块对应于一个目录。
* 块和目录有相同的名称。例如：`header` 块在 `header/` 目录下，而 `menu` 块在 `menu/` 目录下。
* 一个块的实现被划分为不同的技术文件。例如：`header.css` 和 `header.js`。
* 块目录是其元素和修改器的子目录的根目录。
* 元素目录的名称以双下划线（ `__` ）开头。例如：`header/__logo/` 和 `menu/__item/`。
* 修改器目录的名称以单下划线( `_` )开始。例如：`header/_fixed/` 和 `menu/_theme_islands/`。
* 元素和修饰符的实现被划分为单独的技术文件。例如：`header__input.js` 和 `header_theme_islands.css`。

**例子**

```files
search-form/                           # `search-form` 的目录

    __input/                           # `search-form__input` 的子目录。

        search-form__input.css         # `search-form__input` 元素的CSS实现

        search-form__input.js          # `search-form__input` 元素的JS实现

    __button/                          # `search-form__button` 元素的子目录

        search-form__button.css
        search-form__button.js

    _theme/                            # `search-form_theme` 修饰符的子目录

        search-form_theme_islands.css  # 具有 `islands` 修改符的 `search-form` 块的CSS实现，其值为 `islands`。

        search-form_theme_lite.css     # `search-form` 块的CSS实现，该块的`islands`修改符的值为`lite`。

    search-form.css                    # `search-form` 块的CSS实现
    search-form.js                     # `search-form` 块的JS实现
```

这种文件结构使得代码很容易支持和重用。

> 分支的文件结构假定在生产中，代码将被[组装成共享的项目文件](/build/#建立一个BEM项目)。

你不需要遵循[推荐的文件结构](/filestructure/#嵌套)。你可以使用任何遵循BEM原则的替代项目结构来组织文件结构，例如：

* [扁平化](/filestructure/#扁平化)
* [灵活性](/filestructure/#灵活性)
