'use strict'
const fs = require('fs')
const path = require('path')
const Module = require('module').Module
const oldResolveFilename = Module._resolveFilename
const installedMarker = '__require-self-ref-installed'

const cache = new Map()

function isSelfRefRequire (requestedPackage) {
  const prefix = requestedPackage.substring(0, 2)
  return prefix === '~/' || prefix === '~'
}

function getRootDir (start) {
  const cached = cache.get(start)
  if (cached) return cached
  let currentDir = path.dirname(start)
  while (true) {
    const packagePath = path.join(currentDir, 'package.json')
    if (!fs.existsSync(packagePath)) {
      currentDir = path.resolve(path.join(currentDir, '..'))
      continue
    }
    const resolved = path.resolve(currentDir)
    cache.set(start, resolved)
    return resolved
  }
}

if (!Module[installedMarker]) {
  Object.defineProperty(Module, installedMarker, {
    value: true
  })

  Module._resolveFilename = function (request, parent, isMain) {
    if (!parent.filename) return oldResolveFilename.call(this, request, parent, isMain)
    if (isSelfRefRequire(request)) {
      const rootDir = getRootDir(parent.filename)
      if (rootDir) {
        const firstSlashPos = request.indexOf('/')
        const actualRequest = firstSlashPos === -1
          ? rootDir
          : rootDir + request.substring(firstSlashPos)
        return oldResolveFilename.call(this, actualRequest, parent, isMain)
      }
    }
    return oldResolveFilename.call(this, request, parent, isMain)
  }
}

module.exports.internals = {
  isSelfRefRequire,
  getRootDir
}
