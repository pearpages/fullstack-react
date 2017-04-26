# JSX and the Virtual DOM

React works differently than many earlier front-end JavaScript frameworks in that instead of working with the browser’s DOM, it builds a virtual representation of the DOM. By virtual, we mean a tree of JavaScript objects that represent the “actual DOM”.

## References

+ JSX in Depth40 - (Facebook)
+ If-Else in JSX41 - (Facebook)
+ React (Virtual) DOM Terminology42 - (Facebook) • What is Virtual DOM43 - (Jack Bishop)

## What is the Virtual DOM?

The Virtual DOM is a tree of JavaScript objects that represents the actual DOM.

+ use efficient diffing algorithms, in order to know what changed
+ update subtrees of the DOM simultaneously
+ batch updates to the DOM

That is, not only can React render into the browser’s DOM, but it can also be used to render views in other frameworks such as mobile apps. In React Native (which we talk about later in this book), this tree is rendered into native mobile views.

> **The Virtual DOM** is a tree of JavaScript objects that represent the real DOM elements.

> **The Shadow DOM** is a form of encapsulation on our elements. Think about using the <video> tag in your browser. In a video tag, your browser will create a set of video controls such as a play button, a timecode number, a scrubber progress bar etc. These elements aren’t part of your “regular DOM”, but instead, part of the “Shadow DOM”.

## ReactElement

A ReactElement is a representation of a DOM element in the Virtual DOM.

React will take these ReactElements and place them into the “actual DOM” for us.

### Create React Element

1. The DOM element type
2. The element props
3. The children of the element

```js
var boldElement = React.createElement('b', null, "Text (as a string)");

// Either of these will work
var mountElement = document.getElementById('root');
// var mountElement = document.querySelector('#root');

// Render the boldElement in the DOM tree
ReactDOM.render(boldElement, mountElement, () => console.log('The React app has been rendered/updated'));
```

## JSX

We can think of it this way: to describe pages to our browser we write HTML; the HTML is parsed by the browser to create HTML Elements which become the DOM.

HTML works very well for specifying tag hierarchies. It would be nice to represent our React component tree using markup, much like we do for HTML.

This is the idea behind JSX.

```js
const element = (<div>Hello world</div>);
```

One difference between React components and HTML tags is in the naming. HTML tags start with a lowercase letter, while React components start with an uppercase.

```js
// html tag
const htmlElement = (<div>Hello world</div>);

// React component
const Message = React.createClass({
    render() {
        return (<div>{this.props.text}</div>);
    }
});

// Use our React component with a Message tag
const reactComponent = (<Message text="Hello world" />);
```

### Babel

When we write JSX, we pass it through a “compiler” (sometimes we say the code is transpiled) that converts the JSX to JavaScript. The most common tool for this is a plugin to babel.

### Attribute Expressions

```js
// ...
const warningLevel = 'debug';
const component = (<Alert
                    color={warningLevel === 'debug' ? 'gray' : 'red' }
                    log={true}
                    />);
```

### Conditional Child Expressions

```js
// ...
const renderAdminMenu = function () {
    return (<MenuLink to="/users">User accounts</MenuLink>)
}
// ...
const userLevel = this.props.userLevel;
return (
    <ul>
        <li>Menu</li>
        {UserLevel === 'admin' && renderAdminMenu()}
    </ul>
);
```

or even

```js
const Menu = (<ul>{loggedInUser ? <UserMenu /> : <LoginLink />}</ul>);
```

### JSX Boolean Attributes

```js
<input name='Name' disabled={true} />

// or

let formDisabled = true;
<input name='Name' disabled={formDisabled} />
```

### JSX Comments

```js
let userLevel = 'admin';
{/*
    Show the admin menu if the userLevel is 'admin'
*/}
{userLevel === 'admin' && <AdminMenu />}
```

### JSX Spread Syntax

```js
<Component
    msg={"Hello"}
    receipient={"World"}
/>

// vs

<Component {...props} />
```

### JSX Gotchas

+ *class* and *className*
+ *for* and *htmlFor*
* HTML Entities and Emoji
+ data-anything

```js
// emoji
return (
    <ul>
        <li>dolphin: {'\uD83D\uDC2C'}</li>
        <li>dolphin: {'\uD83D\uDC2C'}</li>
        <li>dolphin: {'\uD83D\uDC2C'}</li>
    </ul>
);
```

```js
//data-anything
// If we want to apply our own attributes that the HTML spec does not cover, we have to prefix the attribute key with the string data-.
<div className='box' data-dissmissable={true} />
<span data-highlight={true} />
```

This requirements only applies to DOM components that are native to HTML and does not mean custom components cannot accept arbitrary keys as props. That is, we can accept any attribute on a custom component.

