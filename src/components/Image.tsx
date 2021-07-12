import React, { useEffect, useState, useRef } from 'react'
import { Skeleton } from 'antd'
import { GATEWAY } from '../config'

function PortalImage({ src, ...props }: any) {
  const ref = useRef<any>(null)
  const [called, setCalled] = useState(false)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (called) return
    if (!src.includes('syncretis')) {
      if (ref.current) {
        ref.current.src = src
      }
      setLoading(false)
      return
    }
    setCalled(true)

    const url = `${GATEWAY}/azstorage?src=${src}`
    fetch(url, {
      headers: {
        'Content-Type': 'arraybuffer',
      },
    })
      .then(data => {
        if (data.ok) {
          return data.arrayBuffer()
        } else {
          console.log('Image fetch error')
        }
      })
      .then(data => {
        if (!data) return
        const bufferString = Buffer.from(data).toString('base64')
        setLoading(false)
        let newSrc = 'data:image;base64,' + bufferString
        if (src.endsWith('.svg')) {
          newSrc = 'data:image/svg+xml;base64,' + bufferString
        }
        if (ref.current) {
          ref.current.src = newSrc
        }
      })

    //eslint-disable-next-line
  }, [])

  if (loading) {
    return <Skeleton.Image />
  }

  return <img ref={ref} {...props} src={ref.current?.src || src} alt={props.alt || props.src} />
}

export default PortalImage
