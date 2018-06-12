const assert = require('assert')

let timer
let fns = []
let names = []

module.exports = function add(name, fn) {
  clearTimeout(timer)
  fns.push(fn)
  names.push(name)
  timer = setTimeout(() => {
    start()
  }, 1000)
}

async function start() {
  for (let index = 0; index < names.length; index++) {
    const name = names[index]
    const fn = fns[index]
    await work(name, fn)
  }
}

function work(name, fn) {
  let start = Date.now()
  let p = new Promise((resolve, reject) => {
    // let timer = setTimeout(() => {
    //   reject(new Error('timeout'))  
    // }, 4000)

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

  return p
    .then(() => {
      console.log(`${name} - ${Date.now() - start}ms - success`)
    })
    .catch(e => {
      console.log(`${name} - ${Date.now() - start}ms - failed - ${e.message}`)
    })
}
