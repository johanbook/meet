# Private NPM registry

We use Github NPM registry to host private NPM packages (e.g. for shared code).
This means one has to authenticate to these when installing packages.

## Login to install private packages

To login, use the following script

```sh
./login-to-private-npm
```

with a Github classic access token. See
[this link](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-with-a-personal-access-token).
