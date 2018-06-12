const test = require('../')
const assert = require('assert')

test('test', () => {
  assert.equal(1, 1)
})

test('test', done => {
  setTimeout(() => {
    assert.equal(1, 1)
    done()
  }, 1000)
})
