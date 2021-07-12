import { Avatar, Tooltip } from 'antd'
import { AvatarProps } from 'antd/es/avatar'
import React, { useEffect, useState, useRef } from 'react'
import { Employee } from '../types'
import { UserOutlined } from '@ant-design/icons'
import { EmployeeIDB } from '../utils/IndexedDB'
import GraphAPI from '../utils/GraphAPI'

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
}

interface Props {
  employee: Pick<Employee, 'email' | 'name'>
  size?: AvatarProps['size']
  shape?: AvatarProps['shape']
  showTooltip?: boolean
  highResolution?: boolean
  withHat?: boolean
}

const avatars: Record<string, Record<string, string>> = { high: {}, low: {} }
const requests: Record<string, Promise<string | null>> = {}

export default function PortalAvatar({
  size,
  shape,
  employee,
  showTooltip,
  highResolution,
  withHat,
}: Props) {
  const resolution = highResolution ? 'high' : 'low'
  const storedAvatar = avatars[resolution]?.[employee?.email]
  const [src, setSrc] = useState<string>(storedAvatar)
  const [showPlaceholder, setShowPlaceholder] = useState(false)

  const node = useRef<HTMLElement>(null)
  const observer = useRef<IntersectionObserver>()

  useEffect(() => {
    const employeeIDB = new EmployeeIDB()
    if (storedAvatar) {
      // fix for cases when email was changed
      setSrc(storedAvatar)
      return
    }

    // The supported sizes of HD photos on Microsoft 365 are as follows:
    // 48x48, 64x64, 96x96, 120x120, 240x240, 360x360, 432x432, 504x504, and 648x648
    const path =
      resolution === 'high'
        ? `users/${employee?.email}/photo/$value`
        : `users/${employee?.email}/photos/120x120/$value`

    const graphAPI = new GraphAPI()

    const url = `${graphAPI.graphURL}?path=${path}&response_type=arraybuffer`

    observer.current = new IntersectionObserver(async (entries, observer) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target)

          // Check saved avatar in indexedDB
          const blobFromIDB = (await employeeIDB.get(employee.email))?.avatar?.[resolution]
          if (blobFromIDB) {
            const src = URL.createObjectURL(blobFromIDB)
            setSrc(src)
            avatars[resolution][employee.email] = src
            return
          } else if (blobFromIDB === null) {
            setShowPlaceholder(true)
            return
          }

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
              fetch(url, {
                headers: {
                  'Content-Type': 'arraybuffer',
                },
              })
                .then(data => {
                  console.log({ data })
                  console.log({ data1: data.statusText })
                  if (data.statusText === 'OK') {
                    return data.arrayBuffer()
                  } else throw new Error('Image fetch error')
                })
                .then(data => {
                  console.log({ data2: data })
                  return new Blob([data])
                })
                .then(blob => {
                  console.log({ data3: blob })
                  const src = URL.createObjectURL(blob)
                  avatars[resolution][employee?.email] = src
                  setSrc(src)
                  resolve(src)
                  // Save avatar to indexedDB
                  employeeIDB.put({ mail: employee.email, avatar: { [resolution]: blob } })
                })
                .catch(e => {
                  console.error('Avatar fetch error: ', e)
                  // Save avatar = null to indexedDB
                  employeeIDB.put({ mail: employee.email, avatar: { [resolution]: null } })
                  setShowPlaceholder(true)
                  resolve(null)
                })
            })
          }
        }
      }
    }, options)

    if (node.current) observer.current?.observe(node.current)

    return () => {
      observer.current?.disconnect()
    }
  }, [resolution, employee, storedAvatar])

  const avatar = (
    <Avatar
      ref={node}
      data-cy="avatar"
      src={src}
      size={size || 'default'}
      shape={shape}
      alt={`${employee?.name}'s avatar`}
      icon={showPlaceholder && <UserOutlined />}
    />
  )

  if (showTooltip) {
    return (
      <Tooltip key={employee?.email} placement="top" title={employee?.name}>
        {avatar}
      </Tooltip>
    )
  }

  return avatar
}
