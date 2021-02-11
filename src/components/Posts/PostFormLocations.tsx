import { Form, Switch, Tag, Space } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import { LOCATION } from '../../types'

const { CheckableTag } = Tag

const LOCATIONS = Object.values(LOCATION)

interface Props {
  value?: string[]
  onChange?: (values: string[] | undefined) => void
}

export default function PostFormLocations({ value, onChange }: Props) {
  const [show, toggleShow] = useState(Boolean(value?.length))

  const handleChange = useCallback(
    (tag: string) => {
      if (value?.includes(tag)) {
        if (onChange) onChange((value || []).filter(i => i !== tag))
      } else {
        if (onChange) onChange((value || []).concat(tag))
      }
    },
    [value, onChange],
  )

  useEffect(() => {
    if (value?.length && !show) {
      toggleShow(true)
    }
  }, [value, show])

  return (
    <>
      <Form.Item label="Make a newsletter" style={{ paddingBottom: 0 }}>
        <Space align="end">
          <Switch
            checked={show}
            onChange={() => {
              toggleShow(!show)
              if (show) {
                if (onChange) {
                  onChange(undefined)
                }
              }
            }}
          />
          {show && (
            <div>
              {LOCATIONS.map(tag => (
                <CheckableTag
                  key={tag}
                  checked={value?.includes(tag) || false}
                  onChange={() => handleChange(tag)}
                >
                  {tag}
                </CheckableTag>
              ))}
            </div>
          )}
        </Space>
      </Form.Item>
    </>
  )
}
