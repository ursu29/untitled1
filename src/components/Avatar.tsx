import { Avatar, Tooltip } from 'antd'
import { AvatarProps } from 'antd/es/avatar'
import React, { useEffect, useState, useRef } from 'react'
import { useAccessToken } from '../utils/useToken'
import { Employee } from '../types'
import { UserOutlined } from '@ant-design/icons'
import { AvatarHat } from './UI/AvatarHat'

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
}

interface Props {
  employee: Pick<Employee, 'email' | 'name'>
  size: AvatarProps['size']
  shape?: AvatarProps['shape']
  showTooltip?: boolean
  highResolution?: boolean
  withHat?: boolean
}

const avatars: Record<string, Record<string, string>> = { high: {}, low: {} }
const requests: Record<string, Promise<string | null>> = {}

export default function ({ size, shape, employee, showTooltip, highResolution, withHat }: Props) {
  const resolution = highResolution ? 'high' : 'low'
  const storedAvatar = avatars[resolution]?.[employee?.email]
  const { token } = useAccessToken()
  const [src, setSrc] = useState<any>(storedAvatar)
  const [showPlaceholder, setShowPlaceholder] = useState(false)

  const node: any = useRef(null)
  const observer: any = useRef(null)

  useEffect(() => {
    if (!token) return
    if (storedAvatar) return

    // The supported sizes of HD photos on Microsoft 365 are as follows:
    // 48x48, 64x64, 96x96, 120x120, 240x240, 360x360, 432x432, 504x504, and 648x648
    const path =
      resolution === 'high'
        ? `users/${employee.email}/photo/$value`
        : `users/${employee.email}/photos/120x120/$value`

    const url = `https://graph.microsoft.com/v1.0/${path}`

    observer.current = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target)
          if (requests[url]) {
            requests[url].then(src => {
              if (src) {
                setSrc(src)
                avatars[resolution][employee?.email] = src
              } else {
                setShowPlaceholder(true)
              }
            })
            return
          } else {
            requests[url] = new Promise(resolve => {
              fetch(url, { headers: { Authorization: `Bearer ${token}` } })
                .then(data => {
                  if (data.statusText === 'OK') {
                    return data.blob()
                  } else throw new Error('Catched error')
                })
                .then(blob => {
                  const src = URL.createObjectURL(blob)
                  avatars[resolution][employee?.email] = src
                  setSrc(src)
                  resolve(src)
                })
                .catch(() => {
                  setShowPlaceholder(true)
                  resolve(null)
                })
            })
          }
        }
      })
    }, options)

    if (node.current) observer.current?.observe(node.current)

    return () => {
      observer.current.disconnect()
    }
    //eslint-disable-next-line
  }, [token, resolution, employee, node, setSrc])

  const avatar = (
    <AvatarHat withHat={withHat}>
      <Avatar
        ref={node}
        data-cy="avatar"
        src={src}
        size={size}
        shape={shape}
        alt={`${employee.name}'s avatar`}
        icon={showPlaceholder && <UserOutlined />}
      />
    </AvatarHat>
  )

  if (showTooltip) {
    return (
      <Tooltip key={employee.email} placement="top" title={employee.name}>
        {avatar}
      </Tooltip>
    )
  }

  return avatar
}
