# 利用BEM解决Web开发中的常见问题

The BEM methodology defines [CSS selector naming conventions](/naming-convention/) that solve a range of web development problems and address the following issues:

- [利用BEM解决Web开发中的常见问题](#%e5%88%a9%e7%94%a8bem%e8%a7%a3%e5%86%b3web%e5%bc%80%e5%8f%91%e4%b8%ad%e7%9a%84%e5%b8%b8%e8%a7%81%e9%97%ae%e9%a2%98)
  - [如何简化代码促进重构?](#%e5%a6%82%e4%bd%95%e7%ae%80%e5%8c%96%e4%bb%a3%e7%a0%81%e4%bf%83%e8%bf%9b%e9%87%8d%e6%9e%84)
    - [如何获得自我证明代码](#%e5%a6%82%e4%bd%95%e8%8e%b7%e5%be%97%e8%87%aa%e6%88%91%e8%af%81%e6%98%8e%e4%bb%a3%e7%a0%81)
  - [如何开始重用代码而不让组件之间相互影响的情况下开始重用代码?](#%e5%a6%82%e4%bd%95%e5%bc%80%e5%a7%8b%e9%87%8d%e7%94%a8%e4%bb%a3%e7%a0%81%e8%80%8c%e4%b8%8d%e8%ae%a9%e7%bb%84%e4%bb%b6%e4%b9%8b%e9%97%b4%e7%9b%b8%e4%ba%92%e5%bd%b1%e5%93%8d%e7%9a%84%e6%83%85%e5%86%b5%e4%b8%8b%e5%bc%80%e5%a7%8b%e9%87%8d%e7%94%a8%e4%bb%a3%e7%a0%81)
    - [在BEM中使用级联](#%e5%9c%a8bem%e4%b8%ad%e4%bd%bf%e7%94%a8%e7%ba%a7%e8%81%94)
  - [如何在同一个DOM节点上托管多个实体并避免复制和粘贴](#%e5%a6%82%e4%bd%95%e5%9c%a8%e5%90%8c%e4%b8%80%e4%b8%aadom%e8%8a%82%e7%82%b9%e4%b8%8a%e6%89%98%e7%ae%a1%e5%a4%9a%e4%b8%aa%e5%ae%9e%e4%bd%93%e5%b9%b6%e9%81%bf%e5%85%8d%e5%a4%8d%e5%88%b6%e5%92%8c%e7%b2%98%e8%b4%b4)

## 如何简化代码促进重构?

**Problem**

During project layout, interface components are given names based on the context the developer is working with. The context is usually a page or a part of one.

When just one developer is working with the layout for a brief period, name collisions are easily avoided. But if multiple people are working on a project, or edits need to be made at some later point, it is difficult to keep track of component name dependencies. In large projects, modifying a single class may lead to dozens of affected pages.

For example, the following class names can be used for creating a navigation menu:

```html
<ul class="nav">
    <li class="item active"><a class="link">One</a></li>
    <li class="item"><a class="link">Two</a></li>
    <li class="item"><a class="link">Three</a></li>
</ul>
```

They might have the following CSS rules:

```css
.item
{
    padding: 4px 10px;
    color: black;
}

.active
{
    font-weight: bold;
    background: #ffc7c7;
}
```

If we need to add another component containing menu items to the page, the styles for the new `item` will affect the items from the existing navigation menu.

Or let's say we need to change the rules for the `.active` class in the navigation menu. We can't tell from the name which components use it. For example, there could be a `<div class="button active">Click me!</div>` button on another page. In that case, changing the rules for `.active` would affect the style of that button.

In order to find out whether styles can be painlessly changed for the `.active` class, the developer will have to examine the structure of the entire page or project. Any change consumes a significant amount of time just searching for dependent components.

**Solution**

The BEM methodology solves the collision issue using [naming conventions for CSS classes](/naming-convention/#css-selector-naming-convention), providing unique names for all components and their parts.

Using naming conventions allows us to:

* Define unique names for [BEM entities](/key-concepts/#bem-entity).
* Track hierarchical relationships within a block.
* Simplify the code.
* Get [self-documenting code](#how-to-get-self-documenting-code).

Let's take the same navigation menu example:

```html
<ul class="nav">
    <li class="item active"><a class="link">One</a></li>
    <li class="item"><a class="link">Two</a></li>
    <li class="item"><a class="link">Three</a></li>
</ul>
```

But we'll apply BEM naming conventions to it. The `nav` class will designate the block name, `nav__item` and `nav__link` will designate the element names, and `nav__item_active` will indicate the name of a modifier for the `item` element.

In this case, the entry will look like this:

```html
<ul class="nav">
    <li class="nav__item nav__item_active"><a class="nav__link">One</a></li>
    <li class="nav__item"><a class="nav__link">Two</a></li>
    <li class="nav__item"><a class="nav__link">Three</a></li>
</ul>
```

And the CSS will look like this:

```css
.nav__item
{
    padding: 4px 10px;
    color: black;
}

.nav__item_active
{
    font-weight: bold;
    background: #ffc7c7;
}
```

The new CSS class names contain all the information about the block structure. This means that we no longer need to look at the page HTML code to determine all the dependencies. The selector always contains knowledge of which blocks or elements are affected by its rules (in this case, the `nav__item` element). The developer doesn't need to think about the possibility of a `<div class="button active">Click me!</div>` button existing somewhere, because its CSS rules will be written as `.button_active` and won't depend on the rules for the `active` modifier for the menu item (`nav__item_active`).

> Using long names has the following disadvantages:
>
> * The resulting code base is heavier. This problem is solved by using `gzip`, which compresses repetitive sequences in names.
> * More time is spent on writing classes. This burden is eased by using autocomplete in the editor, along with CSS preprocessors and template engines that automatically add prefixes. Long class names provide explicit connections between parts of components, which saves time on analyzing the project architecture.

### 如何获得自我证明代码

**Problem**

When switching to a new project, a developer invests considerable effort learning how everything is organized, where things are, and how the code works. In some cases, more time is spent on this investigation than on implementing functionality or fixing bugs.

**Solution**

One of the goals of BEM is to make it clear what a piece of code does just by the class names. The idea of self-documenting code is that looking at CSS classes, variables, and functions provides enough information on how the code works and how the interface components interact.

Using BEM, you can get HTML with class names that show the interaction of the following parts of code:

* Independent [blocks](/key-concepts/#block).
* [Elements](/key-concepts/#element) (child components) of a block.
* [Modifiers](/key-concepts/#modifier) of a block or an element.

Here is an example with a search form on a website. We won't look at the HTML. We'll try to just read the CSS and understand which part of the interface it describes.

Implementation of the form in a classical layout:

```css
form {}

input
{
    background: red;
}

input[type=submit]
{
    background: buttonface
}
```

This doesn't reflect the relationships between:

* Components and their parts.
* Selectors and specific components of the interface that they are related to.

Using global selectors makes the project code non-extensible, as even the smallest changes will entail edits to all the dependent rules.

Let's write the CSS for classes:

```css
.form {}
.field {}
.submit {}
```

The code is more informative. Now it is clear that there is a form, a field, and a `submit` component. But these names still don't tell us whether `field` belongs to `form`, or what will happen if there are multiple fields or forms on the page. Once again we must return to the HTML.

We'll rewrite the example using [BEM naming conventions](/naming-convention/):

```css
.form {}
.form_search {}
.form__field {}
.form__submit-button {}
```

Now we can see how this code works. The CSS class names show that:

* There is a form implemented by the `form` block.
* The `form_search` modifier indicates that this is a search form.
* The form has nested elements: `form__field` and `form__submit-button`.

Following the BEM naming convention allows us to understand the structure of a block without studying the HTML in detail. Even if another field appears on the page (besides `form__field`), its rules won't affect the search form elements in any way. The new field will be implemented as an element of another block, and will have its own unique name. For example, `attach__field`.

The BEM naming rules help to make the project code unambiguous and informative. This reduces the learning curve for other developers.

## 如何开始重用代码而不让组件之间相互影响的情况下开始重用代码?

**Problem**

The developer uses a similar set of components when developing pages in the same project. For example, a page may have several types of `menu` blocks.

We'll use the navigation menu example to examine this problem:

```html
<ul class="nav">
    <li class="item"><a class="link">One</a></li>
    <li class="item"><a class="link">Two</a></li>
    <li class="item"><a class="link">Three</a></li>
</ul>
```

The CSS styles and `item` can be defined like this:

```css
.item
{
    padding: 4px 10px;
    color: black;
}
```

If additional components containing items will be added to the page, another code block will appear with the `item` class, for example:

```html
<div class="snippets">
    <div class="item">
        <h2 class="title"></h2>
        <img class="thumb">
    </div>
</div>
```

In this case, the CSS can be formatted with cascades. To do this, you only need to extend the rules already written for `.item`:

```css
.item
{
    padding: 4px 10px;
    color: black;
}

.snippets .item
{
    color: red;
    font-size: 14px;
}
```

Code like this will work until the page has to be changed. For example, until you have to move the menu items, use the code somewhere else separate from the parent component, or nest a navigation menu in the `snippets` block.

Using cascades increases coupling of interface components of the interface. You can't fix one component without affecting the style of another one.

**Solution**

[CSS selector naming rules](/naming-convention/) make it possible to change specific points without affecting dependent components. In BEM, every block has a unique name and is self-sufficient.

Let's write the same code in conformance with BEM naming rules:

```html
<ul class="nav">
    <li class="nav__item"><a class="nav__link">One</a></li>
    <li class="nav__item"><a class="nav__link">Two</a></li>
    <li class="nav__item"><a class="nav__link">Three</a></li>
</ul>
```

```css
.nav__item
{
    padding: 4px 10px;
    color: black;
}
```

In this case, adding a new `item` to the page will look like this:

```html
<div class="snippets">
    <div class="snippets__item">
        <h2 class="snippets__title"></h2>
        <img class="snippets__thumb">
    </div>
</div>
```

The `snippets__item` item will have unique CSS rules that only apply to itself:

```css
.snippets__item
{
    padding: 4px 10px;
    color: red;
    font-size: 14px;
}
```

Changes to `nav__item` do not affect `snippets__item`, since the items get different unique names due to the [namespace](https://en.wikipedia.org/wiki/Namespace#In_programming_languages) defined by the block name. This allows forming independent CSS rules for all elements of a block.

This approach makes it possible to protect elements from mutually affecting each other — elements are always part of a block. The same principle is used by Shadow DOM in Web Components. However, in contrast to Shadow DOM, BEM naming conventions are applied without regard for browser compatibility.

The `snippets` and `nav` blocks can be reused and moved within the page or project. The uniqueness of class names based on BEM naming rules allows blocks to be independent of each other.

### 在BEM中使用级联

The BEM methodology allows using cascades.

For example, a cascade is appropriate for changing elements depending on the state of the block or the theme assigned to it:

```css
.nav_hovered .nav__link
{
    text-decoration: underline;
}
```

```css
.nav_theme_islands .nav__item
{
    line-height: 1.5;
}
```

> **Important!** Applying a cascade increases code coupling and makes reuse impossible.

## 如何在同一个DOM节点上托管多个实体并避免复制和粘贴

**Problem**

When working with projects, an implemented functionality may need to be reused.

In many cases, this issue is resolved by copying the desired chunk of code to the new component. This approach has the following disadvantages:

* The project's code base increases.
* Debugging becomes more difficult if errors are detected.

The consequence is that the developer has to support more lines of code, and fixes must be made separately in each implementation. This increases the time spent on debugging and maintaining the project.

**Solution**

We'll use an example that implements a universal navigation menu block and follows all the [BEM naming rules](/naming-convention/).

```html
<ul class="nav">
    <li class="nav__item"><a class="nav__link">One</a></li>
    <li class="nav__item"><a class="nav__link">Two</a></li>
    <li class="nav__item"><a class="nav__link">Three</a></li>
</ul>
```

This block could be used, for example, for navigating articles in a news section.

Let's assume that the news section already has the `articles` block with all the necessary CSS rules.

We can use a [mix](/key-concepts/#mix) to combine the implementation of the two different blocks without copying code. In other words, host the `nav` block and the `articles__nav` element on the same DOM node.

The code will look like this:

```html
<ul class="nav articles__nav">
    <li class="nav__item"><a class="nav__link">One</a></li>
    <li class="nav__item"><a class="nav__link">Two</a></li>
    <li class="nav__item"><a class="nav__link">Three</a></li>
</ul>
```

This implementation allows combining the functionality of the `nav` block with the specific implementation of the `articles__nav` element (the appearance of news articles in the menu). However, there is no need to copy the existing CSS rules. If a bug is detected, only one part of the code will have to be fixed.

> In addition to blocks and elements, you can mix other BEM entities, as well. For more information about ways to use mixes in BEM, see the section [Basic BEM concepts](/key-concepts/#mix).
