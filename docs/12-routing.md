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

