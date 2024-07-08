# Enabling user management dashboard

SSH into the Supertokens container as a root user, install `curl` and run

```sh
curl --location --request POST 'http://localhost:3567/recipe/dashboard/user' \
--header 'rid: dashboard' \
--header 'Content-Type: application/json' \
--data-raw '{"email": "<EMAIL>","password": "<PASSWORD>"}'
```

You can then use these credentials to access the user management dashboard.
Navigate to the [console](./system-administration.md) for a link there.
