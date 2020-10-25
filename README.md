# SSLocal

SSLocal helps to make running SSL in your local Webpack development environment as streamlined as possible.

Please **do not use this package in production environments** - it's only meant for local development.

## Installation

1. Install [mkcert](https://github.com/FiloSottile/mkcert)
2. Add `config/certificates` to your application's `.gitignore` file.
3. Add this package to your application's `package.json` - ideally just for the development environment.

```json
"devDependencies": {
  // ...
  "@pat/sslocal": "~0.1",
  // ...
}
```

4. If you're using Webpacker and a Rails application, edit `config/webpack/development.js` to apply SSLocal's logic:

```js
// replace
const environment = require('./environment')

// with
const sslocal = require('sslocal')
const environment = sslocal.apply(require('./environment'))
```

5. Otherwise, use the same approach wherever else you're generating your Webpack configuration. (If you have ideas on how to improve this, please do get in touch!)

## Usage

1. Ensure the `config/certificates` folder exists (`mkdir -p config/certificates`).
2. Generate the local certificate via `mkcert`:

```sh
mkcert --cert-file config/certificates/development.crt \
  --key-file config/certificates/development.key \
  localhost 127.0.0.1
```

3. Boot your Webpack dev server, and it should automatically use SSL using the generated certificate files.

If you're using SSLocal with a Rails app and Webpacker, you'll almost certainly want to install and set up [the SSLocal library for Ruby](https://github.com/pat/sslocal-rb) as well to keep matching protocols.

If you want to switch back to HTTP, just delete the certificate files and restart your Webpack server. The certificate files are not precious, and can be deleted/regenerated as much as you like.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/pat/sslocal-js. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](https://github.com/pat/sslocal-rb/blob/master/CODE_OF_CONDUCT.md).

My knowledge of Webpack is limited, so please do get in touch if you're more familiar with these tools and have ideas on how this project can be improved! Perhaps there's a way to make the application of SSL settings automatic via a Webpack plugin?

## License

The package is copyright Pat Allan, 2020, and is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).

## Code of Conduct

Everyone interacting in SSLocal's codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/pat/sslocal-js/blob/master/CODE_OF_CONDUCT.md).
