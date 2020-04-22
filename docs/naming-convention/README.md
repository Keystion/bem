# 命名规则

The name of a BEM entity is unique. The same BEM entity always has the same name in all technologies (CSS, JavaScript, and HTML). The primary purpose of the naming convention is to give names meaning so that they are as informative as possible for the developer.

Compare the same name for a CSS selector that is written in different ways:

* `menuitemvisible`
* `menu-item-visible`
* `menuItemVisible`

To understand the meaning of the first name, you need read through each word carefully. In the last two examples, the name is clearly divided into its parts. But none of these names helps us understand that `menu` is a block, `item` is an element, and `visible` is a modifier. The rules for naming BEM entities were developed in order to make entity names unambiguous and easy to understand.

## 命名规则

` block-name__elem-name_mod-name_mod-val`

* Names are written in lowercase Latin letters.
* Words are separated by a hyphen (`-`).
* The block name defines the [namespace](https://en.wikipedia.org/wiki/Namespace) for its elements and modifiers.
* The element name is separated from the block name by a double underscore (`__`).
* The modifier name is separated from the block or element name by a single underscore (`_`).
* The modifier value is separated from the modifier name by a single underscore (`_`).
* For boolean modifiers, the value is not included in the name.

> **Important:** Elements of elements [do not exist in the BEM methodology](../../faq/faq.en.md#why-not-create-elements-of-elements-block__elem1__elem2). The naming rules do not allow creating elements of elements, but you can nest elements inside each other in the DOM tree.

### 例子

In HTML, BEM entities are represented by the `class` attribute. In BEM, for any of the technologies, there is a call to the class:
* [CSS](../bem-for-css/bem-for-css.en.md#selectors)
* [JavaScript](../bem-for-js/bem-for-js.en.md#dom-representation-of-dynamic-blocks)
* [templates](../bem-for-html/bem-for-html.en.md#automatic-html-generation)

Examples of the naming rules are applied to CSS.

#### 块名称

`menu`

> [Why don't block names need prefixes?](../history/history.en.md#the-introduction-of-blocks)

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

> **Important:** Identical elements in the same block have the same names. For example, all menu items in the menu block are called `menu__item`.

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

The naming rules above describe the classic approach to naming BEM entities. All [BEM tools](https://en.bem.info/toolbox/) follow the classic naming scheme by default.

There are alternative solutions that are actively used in the BEM community. To have all technologies apply identical names that were created using alternative naming schemes, use the [bem-naming](https://github.com/bem/bem-sdk#naming) tool. By default, `bem-naming` is configured to use the methodology's standard naming convention, but it allows you to add rules so you can use alternative schemes.

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
