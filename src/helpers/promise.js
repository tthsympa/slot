export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
export const requestAnimationFrameP = () => new Promise(requestAnimationFrame)

export const sleepForeground = async ms =>
  sleep(ms).then(requestAnimationFrameP)

export const sleepForegroundLoop = (ms, fn) => {
  let stop = false
  const stopLoop = () => {
    stop = true
  }
  // Clearer like this than with conditionally recursive promises.
  /* eslint-disable */
  ;(async () => {
    while (true) {
      await sleepForeground(ms)
      if (stop) return
      fn()
    }
  })()
  return { stop: stopLoop }
}
