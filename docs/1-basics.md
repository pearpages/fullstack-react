# Basics

## React.createClass()

To create a component, we use the function React.createClass(). This is how all components are defined in React. We pass in a single argument to this function: a JavaScript object.

```js
const ProductList = React.createClass({
    render: function () {
        return (
            <div className="ui items">
                Hello, friend! I am a basci React component.
            </div>
        );
    }
});
```

## JSX (JavaScript eXtension syntax)

Using JSX enables us to write the markup for our component views in a familiar, HTML-like syntax. In the end, this JSX code compiles to vanilla JavaScript.

```js
React.createElement('div', {className: 'ui items'},
  'Hello, friend! I am a basic React component.'
)
```

Which can be represented in JSX as:

```jsx
<div className='ui items'>
  Hello, friend! I am a basic React component.
</div>
```

> Even though the JSX above looks exactly like HTML, it’s important to remember that JSX is actually just compiled into JavaScript (ex: React.createElement('div')).

## Rendering

```js
ReactDOM.render([what], [where]);
```

## Conventions

In React, native HTML elements always start with a lowercase letter whereas React component names always start with an uppercase letter.

