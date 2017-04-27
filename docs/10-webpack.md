# Webpack

In React, we can think of each of our individual components as their own modules. Each component is responsible for some discrete part of our interface. React components might contain their own state or perform complex operations, but the interface for all of them is the same: they accept inputs (props) and output their DOM representation (render). Users of a React component need not know any of the internal details.

Webpack gives us the ability to use npm packages in the browser. We can specify external libraries that we’d like to use in package.json. This is incredibly helpful. Not only do we now have easy access to a vast library of packages. We also get to use npm to manage all the libraries that our app uses. We’ll see in a bit how this all works.

## create-react-app

https://github.com/facebookincubator/create-react-app

```bash
npm i -g create-react-app
```

```bash
$ create-react-app my-app-name
```

The library will configure a “black box” Webpack setup for you. It provides you with the benefits of a Webpack setup while abstracting away the configuration details.

> create-react-app has suggested a powerful organization paradigm for our React app.

### react-scripts

react-scripts specifies all of our app’s development dependencies, like Webpack and Babel. Furthermore, it contains scripts that “glue” all of these dependencies together in a conventional manner.

> create-react-app is just a boilerplate generator. The react-scripts package, specified in package.json, is the engine that will make everything work.

## Webpack basics

With create-react-app, our static assets are served by the Webpack development server that is booted when we run npm start. At the moment, we’re not working with an API.

> Everything is a module in Webpack.

### Hot reloading

The Webpack client maintains an open socket with the server. Whenever the bundle is modified, the client is notified via this websocket. The client then makes a request to the server, asking for a patch to the bundle. Instead of fetching the whole bundle, the server will just send the client the code that client needs to execute to “hot swap” the asset.

## build

```bash
npm run build
```

### Source maps

[Introduction to JavaScript Source Maps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/)

## Ejecting

```bash
npm run ejec
```

## Concurrenty utility

Concurrently is a utility for running multiple processes.

```bash
concurrently "npm run server" "cd client && npm start"
```

```json
// package.json
 "scripts": {
    "start": "concurrently \"npm run server\" \"npm run client\"",
    "server": "babel-node start-server.js",
    "client": "babel-node start-client.js"
},
```

### Using the Webpack development proxy

Webpack Proxy for using two servers simultaneously without CORS.

```json
// Inside client/package.json
"proxy": "http://localhost:3001/",
```

> Make sure to add that line to the client’s package.json, not the server’s.

![proxy image](./images/webpack-proxy.png "Webpack Proxy for using two servers simultaneously without CORS")

