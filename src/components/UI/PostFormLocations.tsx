import { Checkbox, Form, Tag } from 'antd'
import React, { useState, useCallback } from 'react'

const { CheckableTag } = Tag

const LOCATIONS = ['All', 'Saint Petersburg', 'Tomsk', 'Kaliningrad', 'Zürich']

interface Props {
  values?: string[]
  onChange: (values: string[] | undefined) => void
}

export default function PostFormLocations({ values, onChange }: Props) {
  const [show, toggleShow] = useState(Boolean(values))

  const handleChange = useCallback(
    (tag: string) => {
      if (tag === LOCATIONS[0]) {
        onChange([tag])
      } else if (values?.includes(tag)) {
        onChange(values.filter(i => i !== tag && i !== LOCATIONS[0]))
      } else {
        onChange(values?.filter(i => i !== LOCATIONS[0]).concat(tag))
      }
    },
    [values],
  )

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
              onChange([LOCATIONS[0]])
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
