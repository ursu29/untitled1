import { useQuery } from "@apollo/client";
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

const createProjectItem = (i: ProjectPick) => ({ key: i.id, value: i.name })

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
          ? project.map(i => createProjectItem(i))
          : project
          ? createProjectItem(project)
          : undefined
      }
      onBlur={props.onBlur}
      onSelect={(value: any) => {
        if (!value) {
          onChange && onChange('')
          return
        }
        if (!mode) {
          const project = data!.projects.find(i => i.id === value.key)
          if (project) {
            onChange && onChange(project.id)
          }
        } else {
          const ids = value.map((i: any) => i.key)
          const projects = data!.projects.filter(i => ids.includes(i.id))
          onChange && onChange(projects.map(i => i.id))
        }
      }}
      items={data?.projects.map(i => createProjectItem(i))}
      placeholder={placeholder ? placeholder : ''}
      allowClear={allowClear || false}
    />
  )
}

export default React.forwardRef(ProjectSelect)
