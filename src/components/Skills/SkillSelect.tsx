import React from 'react'
import { useGetSkillsQuery } from '../../queries/skills'
import { Skill } from '../../types/graphql'
import Select from '../UI/Select'

type SkillPick = Pick<Skill, 'id' | 'name' | 'description' | 'isMatrixOnly'>

type Props = {
  value?: SkillPick
  onChange?: (skill: string) => any
  onBlur?: any
  defaultOpen?: boolean
  autoFocus?: boolean
  matrixSkillsOnly?: boolean
  allowAddNew?: boolean
  wide?: boolean
  size?: 'large' | 'middle' | 'small'
}

function SkillSelect({ onChange, value, wide, size, ...props }: Props, ref: any) {
  const { data, loading } = useGetSkillsQuery()
  const skill = data?.skills?.find(i => i.id === String(value))
  return (
    <Select
      ref={ref}
      style={{ width: wide ? '100%' : 150 }}
      autoFocus={!loading && props.autoFocus}
      loading={loading}
      size={size}
      value={skill && { key: skill.name, value: skill.name }}
      onBlur={props.onBlur}
      onSelect={(value: { key: string }) => {
        const skill = data!.skills?.find(skill => skill.name === value.key)
        if (skill) {
          onChange && onChange(skill.id)
        }
      }}
      items={data?.skills
        ?.filter(skill => {
          if (props.matrixSkillsOnly) return skill.isMatrixOnly
          return true
        })
        .map(skill => {
          return {
            key: skill.name,
            value: skill.name,
          }
        })}
    />
  )
}

export default React.forwardRef(SkillSelect)
