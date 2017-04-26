# Servers and Apis

## CURL

-X let's you pick the METHOD.

```bash
curl -X GET localhost:3000/api/timers
```

The -H flag sets a header for our HTTP request, Content-Type. We’re informing the server that the body of the request is JSON.

The -d flag sets the body of our request. Inside of single-quotes '' is the JSON data.

```bash
# Note that the backslash \ above is only used to break the command out over multiple lines for readability.
curl -X POST \
-H 'Content-Type: application/json' \
-d`'{"start":1456468632194,"id":"a73c1d19-f32d-4aff-b470-cea4e792406a"}' \ localhost:3000/api/timers/start
```

## jq

If you want to parse and process JSON on the command line, we highly recommend the tool “jq.” You can pipe curl responses directly into jq to have the response pretty-formatted:

```bash
curl -X GET localhost:3000/api/timers | jq '.'
```

