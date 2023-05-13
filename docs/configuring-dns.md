# Configuring DNS

The application is deployed as a static website (homepage) and to a hosted
server. For this to work as intended with a domain name, the following DNS rules
should be configured:

- Apex domain points to homepage
- `www` subdomain points to homepage
- `app` and its subdomains points to hosted servers

## Configuring Apex domain for Github pages

The homepage is by default published to Github pages. To point the Apex domain
here, one should (as of 2023-05-12) add the following A records for root:

```sh
@ -> 185.199.108.153
@ -> 185.199.109.153
@ -> 185.199.110.153
@ -> 185.199.111.153
```

Note that in order to enable HTTPS on Github, one also needs to verify the
domain through account settings.

## Configuring www subdomain for Github pages

Add the following CNAME record

```sh
www -> johanbook.github.io
```

## Configuring subdomains to point to hosted server

Setup an A-record wildcard record to point to servers like so

```sh
* -> <SERVER-IP>
```
