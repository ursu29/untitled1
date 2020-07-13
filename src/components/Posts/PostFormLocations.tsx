import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Checkbox, Tag } from 'antd'
import React, { useState, useCallback, useEffect } from 'react'

const { CheckableTag } = Tag

const LOCATIONS_EN = ['All', 'Saint Petersburg', 'Tomsk', 'Kaliningrad', 'Zürich']
const LOCATIONS_RU = ['Saint Petersburg', 'Tomsk', 'Kaliningrad']

interface Props {
  isTranslated: boolean
  values?: string[]
  onChange: (values: string[] | undefined) => void
}

export default function PostFormLocations({ isTranslated, values, onChange }: Props) {
  const [show, toggleShow] = useState(Boolean(values?.length))

  const LOCATIONS = isTranslated ? LOCATIONS_EN : LOCATIONS_RU

  const handleChange = useCallback(
    (tag: string) => {
      if (tag === 'All') {
        onChange([tag])
      } else if (values?.includes(tag)) {
        onChange((values || []).filter(i => i !== tag && i !== 'All'))
      } else {
        onChange((values || []).filter(i => i !== 'All').concat(tag))
      }
    },
    [values, onChange],
  )

  useEffect(() => {
    if (values?.length && !show) {
      toggleShow(true)
    }
  }, [values, show])

  return (
    <>
      <Form.Item style={{ paddingBottom: 0 }}>
        <Checkbox
          checked={show}
          onChange={() => {
            toggleShow(!show)
            if (show) {
              onChange(undefined)
            } else {
              if (isTranslated) {
                onChange(['All'])
              }
            }
          }}
        >
          Make a newsletter
        </Checkbox>
      </Form.Item>
      {show && (
        <Form.Item>
          {LOCATIONS.map(tag => (
            <CheckableTag
              key={tag}
              checked={values?.includes(tag) || false}
              onChange={() => handleChange(tag)}
            >
              {tag}
            </CheckableTag>
          ))}
        </Form.Item>
      )}
    </>
  )
}
