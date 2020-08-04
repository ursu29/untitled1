import { Form, Switch, Tag, Space } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'

const { CheckableTag } = Tag

const LOCATIONS_EN = ['All', 'Saint Petersburg', 'Tomsk', 'Kaliningrad', 'Zürich']
const LOCATIONS_RU = ['Saint Petersburg', 'Tomsk', 'Kaliningrad']

interface Props {
  isTranslated?: boolean
  value?: string[]
  onChange?: (values: string[] | undefined) => void
}

export default function PostFormLocations({ isTranslated, value, onChange }: Props) {
  const [show, toggleShow] = useState(Boolean(value?.length))

  const LOCATIONS = isTranslated ? LOCATIONS_EN : LOCATIONS_RU

  const handleChange = useCallback(
    (tag: string) => {
      if (tag === 'All') {
        if (onChange) onChange([tag])
      } else if (value?.includes(tag)) {
        if (onChange) onChange((value || []).filter(i => i !== tag && i !== 'All'))
      } else {
        if (onChange) onChange((value || []).filter(i => i !== 'All').concat(tag))
      }
    },
    [value, onChange],
  )

  useEffect(() => {
    if (!isTranslated && value?.includes('All')) {
      if (onChange) onChange((value || []).filter(i => i !== 'All'))
    }
    //eslint-disable-next-line
  }, [isTranslated])

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
              } else {
                if (isTranslated) {
                  if (onChange) {
                    onChange(['All'])
                  }
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
