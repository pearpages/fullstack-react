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

## Props

The Product component can’t modify its votes. *this.props* is **immutable**.

## Propagating the event

We can pass down functions as props too.

## ES6: Arrow functions and this

Inside *ProductList*, we use array’s map() method on Data to setup the variable products. We pass an anonymous arrow function to map(). Inside this arrow function, we call *this.handleProductUpVote*. Here, this is bound to the React object.

JavaScript developers have traditionally used workarounds for this behavior, but arrow functions solve the problem by capturing the this value of the enclosing context.

> We will use arrow functions for all anonymous functions.