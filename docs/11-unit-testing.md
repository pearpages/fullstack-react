# Unit Testing

+ Jest
+ Enzyme
+ BDD
+ Mocks

## Writing tests without a framework

In the example we use:

```json
"devDependencies": {
    "babel-cli": "^6.24.1",
    "babel-plugin-add-module-exports": "^0.2.1",
    "babel-preset-es2015": "^6.24.1"
  },
  "babel": {
    "presets": [
      "es2015"
    ],
    "plugins": [
      "babel-plugin-add-module-exports"
    ]
  }
```

```js
import Modash from './Modash';

let string,actual,expected;

function assertEqual(description, actual, expected) {
    if (actual === expected) {
        console.log(`[PASS] ${description}`);
    } else {
        console.log(`[FAIL] ${description}`);
        console.log(`\tactual: '${actual}'`);
        console.log(`\texpected: '${expected}'`);
    }
}

string = 'there was one catch, and that was CATCH-22';
actual = Modash.truncate(string, 19);
expected = 'there was one catch...';
assertEqual('`truncate()`: truncates a string', actual, expected);

actual = Modash.truncate(string, string.length);
expected = string;
assertEqual('`truncate()`: no-ops if <= length', actual, expected);

actual = Modash.capitalize(string);
expected = 'There was one catch, and that was catch-22';
assertEqual('`capitalize()`: capitalizes the string', actual, expected);

string = 'customer responded at';
actual = Modash.camelCase(string);
expected = 'customerRespondedAt';
assertEqual('`camelCase()`: string with spaces', actual, expected);

```

## Jest

> Facebook created and maintains Jest. For assertions, Jest uses Jasmine’s assertion library.

In a unit test, modules of a software system are tested in isolation.

There are many libraries like:

+ Mocha
+ Jasmine
+ QUnit
+ Chai
+ Tape

All testing libraries usually have:

+ Test runner
+ A domain-specific language
+ An assertion library

## How-to

As of Jest 15, Jest will consider any file that ends with *.test.js or *.spec.js a test.

Jest’s philosophy to require as little configuration as necessary.

+ expect
+ toEqual
+ it
+ describe

```js
expect(true).toBe(true);

const a = { espresso: '60ml' };
expect(a).toEqual({ espresso: '60ml' }) // pass
```

Both describe and it take a string and a function. The string is just a human-friendly description.

```js
describe('My test suite', () => {
    it('`true` should be `true`', () => {
        expect(true).toBe(true);
    });
    it('`false` should be `false`', () => {
        expect(false).toBe(false);
    });
});
```

## Testing React Components

1. Given a set of inputs (state & props), assert what a component should output (render).
2. Given a user action, assert how the component behaves. The component might make a state update or call a prop-function passed to it by a parent.

### Shallow rendering

When a component is shallow rendered, it does not write to a DOM. Instead, it maintains its virtual DOM representation. You can then make assertions against this virtual DOM much like you would an actual one.

Furthermore, your component is rendered only one level deep (hence “shallow”). So if the render function of your component contains children, those children won’t actually be rendered. Instead, the virtual DOM representation will just contain references to the un-rendered child components.

> **ReactTestUtil** React provides a library for shallow rendering React components, ReactTestUtils. This library is useful, but is a bit low-level and can be verbose.

> **Enzyme** is a library that wraps ReactTestUtils, providing lots of handy functionality that is helpful for writing React component tests.

### Enzyme

Enzyme was initially developed by **Airbnb** and is gaining widespread adoption amongst the React open-source community.

```js
const wrapper = Enzyme.shallow(<App />); // shallow() returns an EnzymeWrapper object.
```