import { useRef, useState } from 'react'

import useRafLoop from 'react-use/lib/useRafLoop'

export const useDeltaRafLoop = (callback: (dt: number, time: number) => void) => {
  const lastTimeRef = useRef(0)

  useRafLoop(time => {
    if (lastTimeRef.current !== null) {
      const dt = time - lastTimeRef.current
      // This max prevents huge dt when switching tabs. It's not perfect, but it's good enough
      // Time should also get a fix, but it's not as important
      callback(Math.min(dt, 16.7), time)
    }
    // TODO: use some number instead of null, but I'm in the middle of an other refactor
    lastTimeRef.current = time
  })
}

export const useReactiveHTML = <T>(selector: () => T, msTime = 30): T => {
  const [reactiveValue, setReactiveValue] = useState<T>(selector())
  const timer = useRef(0)

  useDeltaRafLoop(dt => {
    if (timer.current > msTime / 1000) {
      timer.current = 0
      const newValue = selector()
      if (reactiveValue !== newValue) {
        setReactiveValue(newValue)
      }
    } else {
      timer.current += dt
    }
  })

  return reactiveValue
}

export const useReactiveHTMLFast = <T>(selector: () => T): T => useReactiveHTML(selector, 30)
export const useReactiveHTMLSlow = <T>(selector: () => T): T => useReactiveHTML(selector, 100)
