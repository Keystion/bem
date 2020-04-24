# 命名约定

BEM实体的名称是唯一的。同一BEM实体在所有技术（CSS 、 JavaScript 和 HTML）中总是有相同的名称。命名惯例的主要目的是赋予名称以意义，使其尽可能地为开发者提供信息。

对比一下用不同的方式写的CSS选择器的相同名称：

* `menuitemvisible`
* `menu-item-visible`
* `menuItemVisible`

要理解名字的含义，需要仔细读懂每个字的意思。在最后两个例子中，名字都明确地划分出了它的各个部分。但这些名称都不能帮助我们理解，`menu` 是一个块，`item` 是一个元素，`visible` 是一个修饰符。BEM实体的命名规则是为了使实体名称不含糊，易于理解而制定的。

## 命名规则

` block-name__elem-name_mod-name_mod-val`

* 名字用小写的拉丁字母书写。
* 词语之间用连字符（`-`）分隔。
* 块名定义了其元素和修饰符的[命名空间](https://en.wikipedia.org/wiki/Namespace)。
* 元素名和块名之间用双下划线（`__`）分隔。
* 修饰符名称与块或元素名称之间用一个下划线（`_`）分隔。
* 修改器值与修改器名称之间用一个下划线（`_`）分隔。
* 对于布尔型修改器，其值不包括在名称中。

> **重要提示：** BEM方法中[不存在元素的元素](/faq/#why-not-create-elements-of-elements-block__elem1__elem2)。命名规则不允许创建元素的元素，但是您可以在DOM树中将元素彼此嵌套。

### 例子

在HTML中，BEM实体由`class`属性表示。在BEM中，对于任何一种技术，都有一个类的调用：

* [CSS](/bem-for-css/#selectors)
* [JavaScript](/bem-for-js/#dom-representation-of-dynamic-blocks)
* [templates](/bem-for-html/#automatic-html-generation)

命名规则的例子应用到CSS中。

#### 块名称

`menu`

> [为什么块名不需要前缀？](/history/#the-introduction-of-blocks)

*HTML*

```html
<div class="menu">...</div>
```

*CSS*

```css
.menu { color: red; }
```

#### 元素名称

`menu__item`

> **重要：** 同一块中的相同元素有相同的名称。例如：菜单块中的所有菜单项都称为 `menu__item`。

*HTML*

```html
<div class="menu">
    ...
    <span class="menu__item"></span>
</div>
```

*CSS*

```css
.menu__item { color: red; }
```

#### 块的修饰符名称

`menu_hidden`  
`menu_theme_islands`

*HTML*

```html
<div class="menu menu_hidden"> ... </div>
<div class="menu menu_theme_islands"> ... </div>
```

*CSS*

```css
.menu_hidden { display: none; }
.menu_theme_islands { color: green; }
```

#### 元素的修饰符名称

`menu__item_visible`  
` menu__item_type_radio`

*HTML*

```html
<div class="menu">
    ...
    <span class="menu__item menu__item_visible menu__item_type_radio"> ... </span>
</div>
```

*CSS*

```css
.menu__item_visible {}
.menu__item_type_radio { color: blue; }
```

## 其他命名方案

上面的命名规则描述了BEM实体的经典命名方法。所有的[BEM工具](https://en.bem.info/toolbox/)默认都遵循经典的命名方案。

有一些替代性的解决方案在BEM社区中被积极使用。要让所有技术应用使用使用替代命名方案创建的相同名称，请使用[bem-naming](https://github.com/bem/bem-sdk#naming)工具。默认情况下，`bem-naming` 被配置为使用方法论的标准命名公约，但它允许您添加规则，以便您可以使用替代方案。

### 双破折号（-）风格

`block-name__elem-name--mod-name--mod-val`

* 名称用小写的拉丁字母书写。
* BEM实体名称中的单词用连字符（-）分隔。
* 元素名与块名之间用双下划线（__）分隔。
* 布尔型修饰符与块或元素名称之间用双连字符（--）隔开。
* 修改器的值与其名称之间用双连字符（--）分隔。

> **重要提示**：注释内的双连字符（--）可能会在[HTML文档的验证](http://www.w3.org/TR/html5/syntax.html#comments)过程中导致错误。

### 驼峰风格

`blockName-elemName_modName_modVal`

* 名字是用拉丁字母写的。
* 名称中的每个字都以大写字母开头。
* 块、元素和修饰符的名称的分隔符与标准方案中的相同。

### React 风格

`BlockName-ElemName_modName_modVal`

* 名称用拉丁字母书写。
* 块和元素的名称以大写字母开头。修饰符的名称以小写字母开头。
* 名称内的每个字都以大写字母开头。
* 元素名和块名之间用一个连字符（`-`）隔开。
* 修饰符的名称和值之间的分隔符与标准方案中的分隔符相同。

### 没有名称空间的风格

`_available`

* 名称用拉丁字母书写。
* 块或元素的名称不包括在修饰语之前。

这种命名方案限制了[混合](/key-concepts/#混合)的使用，因为它使人无法确定修改器属于哪个块或元素。

### 你的命名系统

You can create your own custom naming solution for BEM entities. The most important thing is that your new naming system makes it possible to programmatically separate blocks from elements and modifiers.
