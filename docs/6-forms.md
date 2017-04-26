# Forms

## Resources

+ https://facebook.github.io/react/docs/events.html

## Events and Event Handlers

This event object is a *SyntheticEvent*. This SyntheticEvent is just a cross-browser **wrapper** around the browser’s native MouseEvent, and you’ll be able to use it the same way you would a native DOM event. In addition, if you need the original native event you can access it via the nativeEvent attribute (e.g. evt.nativeEvent).

```js
const Buttons = React.createClass({

  onButtonClick(evt) {
    const btn = evt.target;
    console.log(`The user clicked ${btn.name}: ${btn.value}`);
  },

  render() {
    return (
      <div>
        <h1>What do you think of React?</h1>

        <button
          name='button-1'
          value='great'
          onClick={this.onButtonClick}
        >
          Great
        </button>

        <button
          name='button-2'
          value='amazing'
          onClick={this.onButtonClick}
        >
          Amazing
        </button>
      </div>
    );
  },
});
```