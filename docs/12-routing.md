# Routing

1. Browser makes a request to the server for this page.
2. Theserver doesn’t care about the path name. Instead, it just returns a standard index.html that includes the React app and any static assets.
3. The React app mounts.

- now -

4. The React app extracts the identifiers from the URL and uses these identifiers to make an API call to fetch the data for the artist and the album. It might make this call to the same server.
5. The React app renders the page using data it received from the API call.

> Single-page applications (**SPAs**) are web apps that load once and then dynamically update elements on the page using JavaScript. Every React app we’ve built so far has been a type of SPA.

As we’ll see first hand, routing involves two primary pieces of functionality:

1. Modifying the location of the app (the URL)
2. determining what React components to render at a given location.

## React Router

In React Router, Match is a component that determines whether or not to render a specified component based on the app’s location.

We’ll need to supply Match with two arguments as props:

+ The pattern to match against the location
+ The component to render when the location matches pattern

```js
import React, { Component } from 'react';
import './App.css';

const Match = ({ pattern, component: Component }) => {
  const pathname = window.location.pathname;
  if (pathname.match(pattern)) {
    return (
      <Component />
    );
  } else {
    return null;
  }
};

const Atlantic = () => (
  <div>
    <h3>Atlantic Ocean</h3> <p>
      The Atlantic Ocean covers approximately 1/5th of the
      surface of the earth.
</p> </div>
);

const Pacific = () => (
  <div>
    <h3>Pacific Ocean</h3> <p>
      Ferdinand Magellan, a Portuguese explorer, named the ocean
      'mar pacifico' in 1521, which means peaceful sea.
</p> </div>
);

class App extends Component {
  render() {
    return (
      <div
        className='ui text container'
      >
        <h2 className='ui dividing header'>
          Which body of water
        </h2>

        <ul>
          <li>
            <a href='/atlantic'>
              <code>/atlantic</code>
            </a>
          </li>
          <li>
            <a href="/pacific">
              <code>/pacific</code>
            </a>
          </li>
        </ul>

        <hr />

        <Match pattern='/atlantic' component={Atlantic} />
        <Match pattern='/pacific' component={Pacific} />
      </div>
    );
  }
}

export default App;
```

> We’ll want the browser to skip its default routine of making a web request to fetch the next page. Instead, we just want to manually update the browser’s location.

It has methods like history.back() and history.forward() that allow you to navigate the history stack. Furthermore, t has a method history.pushState() which allows you to navigate the browser to a desired location.

```js
import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';
import './App.css';

const history = createHistory();

const Link = ({ to, children }) => (
  <a
    onClick={(e) => {
      e.preventDefault();
      history.push(to);
    }}
    href={to} >
    {children}
  </a>
);


const Match = ({ pattern, component: Component }) => {
  const pathname = window.location.pathname;
  if (pathname.match(pattern)) {
    return (
      <Component />
    );
  } else {
    return null;
  }
};

const Atlantic = () => (
  <div>
    <h3>Atlantic Ocean</h3> <p>
      The Atlantic Ocean covers approximately 1/5th of the
      surface of the earth.
</p> </div>
);

const Pacific = () => (
  <div>
    <h3>Pacific Ocean</h3> <p>
      Ferdinand Magellan, a Portuguese explorer, named the ocean
      'mar pacifico' in 1521, which means peaceful sea.
</p> </div>
);

class App extends Component {

  componentDidMount() {
    history.listen(() => this.forceUpdate());
  }

  render() {
    return (
      <div
        className='ui text container'
      >
        <h2 className='ui dividing header'>
          Which body of water
        </h2>

        <ul>
          <li>
            <Link to='/atlantic'>
              <code>/atlantic</code>
            </Link>
          </li>
          <li>
            <Link to="/pacific">
              <code>/pacific</code>
            </Link>
          </li>
        </ul>

        <hr />

        <Match pattern='/atlantic' component={Atlantic} />
        <Match pattern='/pacific' component={Pacific} />
      </div>
    );
  }
}

export default App;
```

## Building a Router

```js
import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory';
import './App.css';

const Link = ({ to, children }, {history}) => (
  <a
    onClick={(e) => {
      e.preventDefault();
      history.push(to);
    }}
    href={to} >
    {children}
  </a>
);

Link.contextTypes = {
  history: React.PropTypes.object,
};

class Router extends React.Component {
  static childContextTypes = {
    history: React.PropTypes.object,
    location: React.PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.history = createHistory();
    this.history.listen(() => this.forceUpdate());
  }
  getChildContext() {
    return {
      history: this.history,
      location: window.location,
    };
  }
  render() {
    return this.props.children;
  }
}

const Match = ({ pattern, component: Component }, {location}) => {
  const pathname = location.pathname;
  if (pathname.match(pattern)) {
    return (
      <Component />
    );
  } else {
    return null;
  }
};

Match.contextTypes = {
  location: React.PropTypes.object,
};

const Atlantic = () => (
  <div>
    <h3>Atlantic Ocean</h3> <p>
      The Atlantic Ocean covers approximately 1/5th of the
      surface of the earth.
</p> </div>
);

const Pacific = () => (
  <div>
    <h3>Pacific Ocean</h3> <p>
      Ferdinand Magellan, a Portuguese explorer, named the ocean
      'mar pacifico' in 1521, which means peaceful sea.
</p> </div>
);

class App extends Component {

  render() {
    return (
      <Router>
        <div
          className='ui text container'
        >

          <h2 className='ui dividing header'>
            Which body of water
        </h2>

          <ul>
            <li>
              <Link to='/atlantic'>
                <code>/atlantic</code>
              </Link>
            </li>
            <li>
              <Link to="/pacific">
                <code>/pacific</code>
              </Link>
            </li>
          </ul>

          <hr />

          <Match pattern='/atlantic' component={Atlantic} />
          <Match pattern='/pacific' component={Pacific} />
        </div>
      </Router>
    );
  }
}

export default App;
```

