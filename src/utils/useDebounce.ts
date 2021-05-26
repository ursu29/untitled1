import { useMemo, useEffect } from 'react'
import { debounce } from 'throttle-debounce'

type AnyFunction = (...args: any[]) => any

export const useDebouncedCallback = <Callback extends AnyFunction>(
  delay: number,
  callback: Callback,
) => {
  const debouncedCallback = useMemo(() => debounce(delay, callback), [delay, callback])
  useEffect(() => debouncedCallback.cancel, [debouncedCallback])
  return debouncedCallback
}
