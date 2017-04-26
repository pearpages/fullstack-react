# Advanced Component Configuration

A ReactComponent is a JavaScript object that, at a minimum, has a **render()** function. render() is expected to return a ReactElement.

## Concepts

+ render()
+ props
+ context
+ state
+ Stateless components
+ children
+ statics

---

## React Component

React expects the method to return a single child element. It can be a virtual representation of a DOM component or can return the falsy value of null or false. React handles the falsy value by rendering an empty element (a <noscript /> tag). This is used to remove the tag from the page.

```js
// React.createClass
const App = React.createClass({
    render: function() {} // required method
});
```

```js
// ES6 class-style

// CAN'T USE MIXINS
class App extends React.Component {
    render() {} // required
}
```

---

## Props, State and Context

### props

In React, props are immutable pieces of data that are passed into child components from parents (if we think of our component as the “function” we can think of props as our component’s “arguments”).

### state

Component state is where we hold data, local to a component. Typically, when our component’s state changes, the component needs to be re-rendered. Unlike props, state is private to a component and is mutable.

### context

We’ll look at both props and state in detail below. Along the way we’ll also talk about context, a sort of “implicit props” that gets passed through the whole component tree.

---

## props

We can pass any JavaScript object through props. We can pass primitives, simple JavaScript objects, atoms, functions etc. We can even pass other React elements and Virtual DOM nodes.

### PropTypes

PropTypes are a way to validate the values that are passed in through our props. Well-defined interfaces provide us with a layer of safety at the run time of our apps.

```js
const Component = React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        totalCount: React.PropTypes.number
    },
    // ...
});
```

```js
import PropTypes from 'prop-types';

class Greeting extends React.Component {
    render() {
        return (
            <h1>Hello, {this.props.name}</h1>
        );
    }
}

Greeting.proptypes = {
    name: PropTypes.string
};
```

### Default props

```js
const Counter = React.crateClass({
    getDefaultProps: function () {
        return {
            initialValue: 1
        }
    }
});
```

```js
class Counter extends React.Component {

}

Counter.defaultProps = {
    initialValue: 1
};
```

---

## context

Minimize the use of context as relying on it too frequently is a code smell.

Two attributes:

+ childContextTypes
+ getChildContext

Without the contextTypes property on the child React component, React won’t know what to send our component.

If contextTypes is defined on a component, then several of it’s lifecycle methods will get passed an additional argument of nextContext.

---

## state

We’ll refer to components that hold local-mutable data as stateful components.

It’s a good idea to have as few stateful components as possible. This is because state introduces complexity and makes composing components more difficult.

> The rule of thumb you should work with is to minimize the number of components with state.

> setState has performance implications

Since the setState method triggers a refresh, we want to be careful about how often we call it.

If we have a component that has UI states which:

1. cannot be “fetched” from outside or
2. cannot be passed into the component, that’s usually a case for building state into the component.

Otherwise we want stateless components.

### getInitialState()

This is en ES5:

1. It allows us to define the initial state of our component.
2. It tells React that our component will be stateful. Without this method defined, our component will be considered to be stateless.

In ES6:

```js
const CREDITCARD = 'Creditcard';
const BTC = 'Bitcoin';

class Switch extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            payMethod: BTC
        };
    }

    select(choice) {
        return (evt) => this.setState({ payMethod: choice })
    }

    renderChoice(choice) {
        return (<div
            className="choice"
            onClick={this.select(choice)}
        >
            <button className={this.state.payMethod === choice ? 'active' : null}>{choice}</button>
        </div >);
    }

    render() {
        return (
            <div className="switch">
                {this.renderChoice(CREDITCARD)}
                {this.renderChoice(BTC)}
                <p>Pay with: {this.state.payMethod}</p>
            </div>
        );
    }
}
```

### Initial Value

ES5:

The getInitialState() method is run only once and before the component itself is actually mounted in the view.

```js
const Wrapper = React.createClass({
    render: function () {
        return (
            <div>
                <Counter initialValue={Date.now() } />
            </div>
        );
    }
})

const Counter = React.createClass({
    getInitialState: function() {
        return {
            currentValue: this.props.initialValue
        }
    }
});
```

---

## Stateless Components

Functional, stateless components do not have a this property to reference. In fact, when we use a stateless component, the React rendering processes does not introduce a new ReactComponent instance, but instead it is null. They are just functions and do not have a backing instance. These components cannot contain state and do not get called with the normal component lifecycle methods. We cannot use refs, cannot reference the DOM, etc.

```js
const Header = function(props) {
    return (<h1>{props.headerText}</h1>)
}
```

We

+ Minimize stateful components
+ We Increase Performance