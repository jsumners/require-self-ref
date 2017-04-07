'use strict'

const path = require('path')
const internals = require('../').internals
const test = require('tap').test

test('isSelfRefRequire returns false specific names', (t) => {
  t.plan(1)
  t.is(internals.isSelfRefRequire('foo'), false)
})

test('isSelfRefRequire returns true for self ref requires', (t) => {
  t.plan(2)
  t.is(internals.isSelfRefRequire('~/lib/foo'), true)
  t.is(internals.isSelfRefRequire('~'), true)
})

test('isSelfRefRequire returns false for relative requires', (t) => {
  t.plan(1)
  t.is(internals.isSelfRefRequire('./foo/bar'), false)
})

test('getRootDir returns valid root path', (t) => {
  t.plan(1)
  const parentDir = path.resolve(path.join(__dirname, '..'))
  t.is(internals.getRootDir('foo/bar'), parentDir)
})
