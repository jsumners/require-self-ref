require('../')

const test = require('tap').test

test('should allow a self-referencing require using tilde', (t) => {
  t.plan(1)
  const foo = require('./my-package/src/some/deeply/nested/path/foo/index.js')
  t.is(foo.bar, require('./my-package/src/util/bar.js'))
})
