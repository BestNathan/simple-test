const test = require('../')
const assert = require('assert')

test('test', () => {
  assert.equal(1, 1)
})

test('test1', done => {
  setTimeout(() => {
    assert.equal(1, 2)
    done()
  }, 1000)
})

test('test2', done => {
    setTimeout(() => {
      assert.equal(1, 3)
      done()
    }, 1000)
  })