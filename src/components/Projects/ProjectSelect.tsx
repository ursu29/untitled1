import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import getProjects, { QueryType } from '../../queries/getProjects'
import { Project } from '../../types'
import Select, { Props as SelectProps } from '../UI/Select'

type ProjectPick = Pick<Project, 'id' | 'name'>

type Props = {
  value?: ProjectPick
  onChange?: (i: string | string[]) => any
  onBlur?: any
  defaultOpen?: boolean
  autoFocus?: boolean
  allowAddNew?: boolean
  wide?: boolean
  size?: 'large' | 'middle' | 'small'
  mode?: SelectProps['mode']
  placeholder?: string
  allowClear?: boolean
}

function ProjectSelect(
  { onChange, value, wide, size, mode, placeholder, allowClear, ...props }: Props,
  ref: any,
) {
  const { data, loading } = useQuery<QueryType>(getProjects)

  const project = Array.isArray(value)
    ? data?.projects.filter(i => value.includes(i.id))
    : data?.projects.find(i => i.id === String(value))

  return (
    <Select
      ref={ref}
      style={{ width: wide ? '100%' : 150 }}
      autoFocus={!loading && props.autoFocus}
      mode={mode}
      loading={loading}
      size={size}
      value={
        Array.isArray(project)
          ? project.map(i => ({ key: i.name, value: i.name }))
          : project
          ? { key: project.name, value: project.name }
          : undefined
      }
      onBlur={props.onBlur}
      onSelect={(value: any) => {
        if (!value) {
          onChange && onChange('')
          return
        }
        if (!mode) {
          const project = data!.projects.find(i => i.name === value.key)
          if (project) {
            onChange && onChange(project.id)
          }
        } else {
          const names = value.map((i: any) => i.key)
          const projects = data!.projects.filter(i => names.includes(i.name))
          onChange && onChange(projects.map(i => i.id))
        }
      }}
      items={data?.projects.map(i => {
        return {
          id: i.id,
          key: i.name,
          value: i.name,
        }
      })}
      placeholder={placeholder ? placeholder : ''}
      allowClear={allowClear || false}
    />
  )
}

export default React.forwardRef(ProjectSelect)
