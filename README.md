@jsumners/require-self-ref
================

**Fork Notice:** this is a fork of the [original require-self-ref][original].
This fork removes production dependencies so that it is a fully self-contained
module. Any issues with *this fork* should **not** be directed at the upstream
project.

Solves the relative path problem in Node.js by allowing the target module argument of a `require` call to be relative to the root directory of the containing package:

For example:

Given a JavaScript module at `my-package/src/some/deeply/nested/path/foo/index.js` that needs to require `my-package/src/util/bar.js`:


Without `require-self-ref`:

```javascript
require('../../../../../../util/bar')
```

:confused:

And _with_ `require-self-ref` installed:

```javascript
require('~/src/util/bar')
```

:smile:

[original]: https://github.com/patrick-steele-idem/require-self-ref

# Installation

```bash
npm install @jsumners/require-self-ref
```

# Usage

At the top of the main entry for your application add the following line:

```javascript
require('@jsumners/require-self-ref')
```

# Important

- Your package must have a `package.json` file at the root
- ***Use at your own risk*** (this package monkey-patches the Node.js require system and it depends on internals of Node.js that may change in the future)
- Compatible with all versions of Node.js

# Related projects:

- [app-module-path](https://github.com/patrick-steele-idem/app-module-path-node) - Simple module to add additional directories to the Node module search for top-level app modules
- [wavy](https://github.com/kolodny/wavy) - Similar to this package, but requires a `postinstall` script and symbolic links

# License

MIT
