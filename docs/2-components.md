# Components

## Single Responsibility Principle

Think about components as you would functions or objects. The single responsibility principle20 applies. A component should, ideally, only be responsible for one piece of functionality.

Not only does this separation of responsibilities keep components simple, but it often also improves their re-usability.

## How to build components

1. Break the app into components
2. Build a static version of the app
3. Determine what should be stateful
4. Determine in which component each piece of state should live 5. Hard-code initial states
6. Add inverse data flow
7. Add server communication

## Inputs

```jsx
<input type='text' defaultValue={this.props.project} />
```

## Rendering Component

Again, we specify *with ReactDOM#render()* which React component we want to render and where in our HTML document (index.html) to render it.

## State Criteria

1. Is it passed in from a parent via props? If so, it probably isn’t state.
2. Does it change over time? If not, it probably isn’t state.
3. Can you compute it based on any other state or props in your component? If so, it’s not state.

## Determine in which component each piece of state should live

* Identify every component that renders something based on that state.
* Find a common owner component (a single component above all the components
that need the state in the hierarchy).
* Either the common owner or another component higher up in the hierarchys hould own the state.
* If you can’t find a component where it makes sense to own the state, create a new component simply for holding the state and add it somewhere in the hierarchy above the common owner component.