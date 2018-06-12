const assert = require('assert')
module.exports = function test(name, fn) {
  let start = Date.now()
  let p = new Promise((resolve, reject) => {
    let timer = setTimeout(() => {
      reject('timeout')
    }, 4000)

    let successCallback = () => {
      clearTimeout(timer)
      resolve()
    }
    let failCallback = error => {
      clearTimeout(timer)
      reject(error)
    }
    process.once('uncaughtException', failCallback)
    if (fn.length) {
      fn(successCallback)
    } else {
      try {
        fn()
        successCallback()
      } catch (error) {
        failCallback(error)
      }
    }
  })

  p.then(() => {
    console.log(`${name} - ${Date.now() - start}ms - success`)
  }).catch(e => {
    console.log(`${name} - ${Date.now() - start}ms - failed - ${e.message}`)
  })
}
