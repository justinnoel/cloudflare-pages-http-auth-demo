# cloudflare-pages-http-auth-demo

Demonstration of a static [Cloudflare Pages](https://developers.cloudflare.com/pages/) project using HTTP Basic Authentication to protect specific directories.

The project demonstrates how a fictional real estate agency could have a website with both public and private information.

Each employee could be given a username and password to allow access to private information.

## Security Concerns

HTTP Basic Authentication is a relatively weak authentication mechanism. Most importantly, the credentials are only encoded - not encrypted. It is imperative that only HTTPS requests be used.

## Directory Structure

### `public`

Contains all HTML, CSS, and other assests.

Unprotected pages and assets can be in either the `public` directory or nested directories.

- `index.html`
- `news`

Protected pages and assets should be nested inside directories.

- `employees`
- `profit-loss`

### `functions`

Each directory in `public` that requires HTTP Basic Authentication should have a matching directory in the `functions` directory.

Each of these directories should contain a `_middleware.js` file to trigger authetication on any path in this directory.

### `utils`

Contains authentication utilities.

## Development

- `npm install`
- `npm run start`

## Deployment

- [Connect your Git provider to Pages](https://developers.cloudflare.com/pages/get-started/guide/#connect-your-git-provider-to-pages) so that all changes to the `main` branch will trigger a new production deployment.
- Configure a KV Namespace called `REALTOR_PAGES_AUTH` and bind this namespace to the new Pages project with the same name.

## Managing Credentials

For each required username/password combination, create a KV entry where the key is the username and the password is the value.

Example:

- key - "john-doe"
- value - "password"
