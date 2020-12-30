import React, { useEffect, useState, useRef } from 'react'
import { useFileStorageToken } from '../utils/useToken'
import { Skeleton } from 'antd'

function PortalImage({ src, ...props }: any) {
  const ref = useRef<any>(null)
  const [called, setCalled] = useState(false)
  const { token } = useFileStorageToken()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) return
    if (called) return
    if (!src.includes('syncretis')) {
      if (ref.current) {
        ref.current.src = src
      }
      setLoading(false)
      return
    }
    setCalled(true)
    const request = new XMLHttpRequest()
    request.open('GET', src, true)
    request.setRequestHeader('Authorization', 'Bearer ' + token)
    request.setRequestHeader('x-ms-version', '2017-11-09')

    request.responseType = 'arraybuffer'
    request.onload = function () {
      const arr = new Uint8Array(this.response)
      let raw = ''
      let i,
        j,
        subArray,
        chunk = 5000
      for (i = 0, j = arr.length; i < j; i += chunk) {
        subArray = arr.subarray(i, i + chunk)
        //@ts-ignore
        raw += String.fromCharCode.apply(null, subArray)
      }
      const base64 = btoa(raw)
      setLoading(false)
      let newSrc = 'data:image;base64,' + base64
      if (src.endsWith('.svg')) {
        newSrc = 'data:image/svg+xml;base64,' + base64
      }
      if (ref.current) {
        ref.current.src = newSrc
      }
    }
    request.send()
    //eslint-disable-next-line
  }, [token])

  if (loading || !token) {
    return <Skeleton.Image />
  }

  return <img ref={ref} {...props} alt={props.alt || props.src} />
}

export default PortalImage
