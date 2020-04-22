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

* [块名](/naming-convention#block-name)描述它的目的（“它是什么？” - `menu` 或 `button`），而不是它的状态（“它看起来像什么？” - `red` 或 `big`）。

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

* [元素名称](/naming-convention#element-name)描述的是它的目的（「这是什么？」-- `项` 、 `文本` 等），而不是它的状态（「什么类型，或者说它是什么样子的？」-- `red`、`big` 等）。
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
<!-- `search-form` block -->
<form class="search-form">
    <!-- `search-form`块中的 `input` -->
    <input class="search-form__input">

    <!-- `search-form`块中的 `button` -->
    <button class="search-form__button">Search</button>
</form>

<!--
    不正确. Elements are located outside of the context of
    the `search-form` block
-->
<!-- `search-form` block -->
<form class="search-form">
</form>

<!-- `input` element in the `search-form` block -->
<input class="search-form__input">

<!-- `button` element in the `search-form` block-->
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

* The [modifier name](/naming-convention#block-modifier-name) describes its appearance ("What size?" or "Which theme?" and so on — `size_s` or `theme_islands`), its state ("How is it different from the others?" — `disabled`, `focused`, etc.) and its behavior ("How does it behave?" or "How does it respond to the user?" — such as `directions_left-top`).
* The modifier name is separated from the block or element name by a single underscore (`_`).

### 修饰符类型

#### 布尔（Boolean）

* Used when only the presence or absence of the modifier is important, and its value is irrelevant. For example, `disabled`. If a Boolean modifier is present, its value is assumed to be `true`.

* The structure of the modifier's full name follows the pattern:

  * `block-name_modifier-name`
  * `block-name__element-name_modifier-name`

**例子**

```html
<!-- The `search-form` block has the `focused` Boolean modifier -->
<form class="search-form search-form_focused">
    <input class="search-form__input">

    <!-- The `button` element has the `disabled` Boolean modifier -->
    <button class="search-form__button search-form__button_disabled">Search</button>
</form>
```

#### 键-值（Key-value）

* Used when the modifier value is important. For example, "a menu with the `islands` design theme": `menu_theme_islands`.

* The structure of the modifier's full name follows the pattern:

  * `block-name_modifier-name_modifier-value`
  * `block-name__element-name_modifier-name_modifier-value`

**例子**

```html
<!-- The `search-form` block has the `theme` modifier with the value `islands` -->
<form class="search-form search-form_theme_islands">
    <input class="search-form__input">

    <!-- The `button` element has the `size` modifier with the value `m` -->
    <button class="search-form__button search-form__button_size_m">Search</button>
</form>

<!-- You can't use two identical modifiers with different values simultaneously -->
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

Mixes allow you to:

* Combine the behavior and styles of multiple entities without duplicating code.
* Create semantically new UI components based on existing ones.

**例子**

```html
<!-- `header` block -->
<div class="header">
    <!--
        The `search-form` block is mixed with the `search-form` element
        from the `header` block
    -->
    <div class="search-form header__search-form"></div>
</div>
```

In this example, we combined the behavior and styles of the `search-form` block and the `search-form` element from the `header` block.
This approach allows us to set the external geometry and positioning in the `header__search-form` element, while the `search-form` block itself remains universal.
As a result, we can use the block in any other environment, because it doesn't specify any padding. This is why we can call it independent.

## 文件结构（file-structure）

BEM方法中采用的组件方法同样适用于[文件结构中的项目](/filestructure/#file-structure-organization)。块、元素和修改器的实现方式被划分为独立的技术文件，也就是说我们可以将它们单独连接起来。

特征:

* A single block corresponds to a single directory.
* The block and the directory have the same name. For example, the `header` block is in the `header/` directory, and the `menu` block is in the `menu/` directory.
* A block's implementation is divided into separate technology files. For example, `header.css` and `header.js`.
* The block directory is the root directory for the subdirectories of its elements and modifiers.
* Names of element directories begin with a double underscore (`__`). For example, `header/__logo/` and `menu/__item/`.
* Names of modifier directories begin with a single underscore (`_`). For example, `header/_fixed/` and `menu/_theme_islands/`.
* Implementations of elements and modifiers are divided into separate technology files. For example, `header__input.js` and `header_theme_islands.css`.

**例子**

```files
search-form/                           # Directory of the `search-form`

    __input/                           # Subdirectory of the `search-form__input`
        search-form__input.css         # CSS implementation of the
                                       # `search-form__input` element
        search-form__input.js          # JavaScript implementation of the
                                       # `search-form__input` element

    __button/                          # Subdirectory of the `search-form__button`
                                       # element
        search-form__button.css
        search-form__button.js

    _theme/                            # Subdirectory of the `search-form_theme`
                                       # modifier
        search-form_theme_islands.css  # CSS implementation of the `search-form` block
                                       # that has the `theme` modifier with the value
                                       # `islands`
        search-form_theme_lite.css     # CSS implementation of the `search-form` block
                                       # that has the `theme` modifier with the value
                                       # `lite`

    search-form.css                    # CSS implementation of the `search-form` block
    search-form.js                     # JavaScript implementation of the
                                       # `search-form` block
```

This file structure makes it easy to support the code and re-use it.

> The branched file structure assumes that in production the code will be [assembled into shared project files](../build/build#building-a-bem-project).

You aren't required to follow the [recommended file structure](../filestructure/filestructure#nested). You can use any alternative project structure that follows the BEM principles for organizing the file structure, such as:

* [Flat](../filestructure/filestructure#flat)
* [Flex](../filestructure/filestructure#flex)
