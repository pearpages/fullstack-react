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