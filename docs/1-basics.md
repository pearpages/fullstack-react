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

## State

Whereas props are immutable and owned by a component’s parent, state is mutable and owned by the component.

**this.state** is private to the component and can be updated with this.setState().

As with props, when the state updates the component will re-render itself.

### getInitialState()

Like render(), getInitialState() is a special method on a React component. It is one of several lifecycle methods available. It is executed exactly once during the component lifecycle and defines the initial state of the component.

### componentDidMount()

Just after the component has been created.

