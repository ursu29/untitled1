import { useQuery } from '@apollo/client'
import React from 'react'
import getLocations, { QueryType } from '../../queries/getLocations'
import { LOCATION } from '../../types'
import getLocationName from '../../utils/getLocationName'
import Select, { Props as SelectProps } from '../UI/Select'

type Props = {
  value?: LOCATION
  onChange?: (i: string | string[]) => any
  onBlur?: any
  defaultOpen?: boolean
  autoFocus?: boolean
  allowAddNew?: boolean
  wide?: boolean
  size?: 'large' | 'middle' | 'small'
  mode?: SelectProps['mode']
}

function LocationSelect({ onChange, value, wide, size, mode, ...props }: Props, ref: any) {
  const { data, loading } = useQuery<QueryType>(getLocations)

  const location = Array.isArray(value)
    ? data?.locations.filter(i => value.includes(i))
    : data?.locations.find(i => i === value)

  return (
    <Select
      ref={ref}
      style={{ width: wide ? '100%' : 150 }}
      autoFocus={!loading && props.autoFocus}
      mode={mode}
      loading={loading}
      size={size}
      value={
        Array.isArray(location)
          ? location.map(i => ({ key: i, value: i }))
          : location
          ? { key: location, value: location }
          : undefined
      }
      onBlur={props.onBlur}
      onSelect={(value: any) => {
        if (!mode || mode === null) {
          const location = data!.locations.find(i => i === value.key)
          if (location) {
            onChange && onChange(location)
          }
        } else {
          const names = value.map((i: any) => i.key)
          const locations = data!.locations.filter(i => names.includes(i))
          onChange && onChange(locations.map(i => i))
        }
      }}
      items={data?.locations.map(i => {
        return {
          id: i,
          key: i,
          value: getLocationName(i),
        }
      })}
      selectProps={{ placeholder: 'Location' }}
    />
  )
}

export default React.forwardRef(LocationSelect)
