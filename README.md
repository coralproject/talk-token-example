# talk-token-example

This is an example application designed to broker tokens for
[Talk](https://github.com/coralproject/talk). It is a part of our integration
documentation at https://docs.coralproject.net/talk/integrating/authentication/.

## Install

```bash
git clone https://github.com/coralproject/talk-token-example.git
cd talk-token-example
yarn
yarn issue
yarn start
```

The `yarn issue` command will print an example curl request that can be issued
to "retrieve" a user from a "database". You can use that request to get a new
token that you can pass to Talk. Imagine this as the request that your CMS will
make in order to get an auth token to inject into the Talk embed on your page.

`yarn start` will start the issuing server that will respond to token creation
requests (`POST /`) and to token lookup request (`GET /`) with those tokens
created via the creation request.

## Consuming

The lookup route (`GET /`) can be used by the `tokenUserNotFound` plugin hook in
your Talk plugin where you can pass the token back (as a [Bearer Token](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#Authentication_schemes) to in order to exchange for
the user information that Talk can use to populate the user.

For example:

```bash
TOKEN=<your-token>
curl -H "Authorization: Bearer $TOKEN" https://<your-deployed-talk-token-example>/
```

## License

talk-token-example is released under the [Apache License, v2.0](/LICENSE).
