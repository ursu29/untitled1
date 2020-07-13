import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import getLocations, { QueryType } from '../../queries/getLocations'
import { Location } from '../../types'
import Select, { Props as SelectProps } from '../UI/Select'

type LocationPick = Pick<Location, 'id' | 'name'>

type Props = {
  value?: LocationPick
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
    ? data?.locations.filter(i => value.includes(i.id))
    : data?.locations.find(i => i.id === String(value))

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
          ? location.map(i => ({ key: i.name, value: i.name }))
          : location
          ? { key: location.name, value: location.name }
          : undefined
      }
      onBlur={props.onBlur}
      onSelect={(value: any) => {
        if (!mode || mode === null) {
          const location = data!.locations.find(i => i.name === value.key)
          if (location) {
            onChange && onChange(location.id)
          }
        } else {
          const names = value.map((i: any) => i.key)
          const locations = data!.locations.filter(i => names.includes(i.name))
          onChange && onChange(locations.map(i => i.id))
        }
      }}
      items={data?.locations.map(i => {
        return {
          id: i.id,
          key: i.name,
          value: i.name,
        }
      })}
    />
  )
}

export default React.forwardRef(LocationSelect)
