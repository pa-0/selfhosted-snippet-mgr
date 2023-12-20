import { useRef, useEffect } from 'react'

interface DebounceProps {
  func: (...args: any[]) => void
  timeout?: number
}

export default ({ func, timeout = 500 }: DebounceProps) => {
  const timerRef = useRef<NodeJS.Timeout | undefined>()

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current)
    }
  }, [])

  const debouncedFunc = (...args: any[]) => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => func(...args), timeout)
  }

  return debouncedFunc
}
