### A simple test case
It is assumed that this web application consumes a thrid party HTTP-based api and displayed information on its own landing page. When the third party API returns a 404 error, the application should display a message on the page, explaining the disfunctionality of that service. A simple test case was written for verifying this behavior.

### Snippet Path
It was at `./src/tests/functional.spec.ts`

### How to run tests
Run the following commands

```sh
npm install
npm run test
```

And you may see

```sh
> mocha --require ts-node/register src/**/*.spec.ts
  Server
    Third Party api returns a 404 error to Server's request
Server running on port 8888!
      ✓ shows unavailable message on main page (124ms)


  1 passing (146ms)
```

