import React, { useState, useEffect } from 'react'
import { useGetSkillsQuery } from '../../queries/skills'
import { Skill } from '../../types/graphql'
import TreeSelect from '../UI/TreeSelect'
import message from '../../message'

type SkillPick = Pick<Skill, 'id' | 'name'>

interface Props {
  value?: SkillPick[]
  disabledSkills?: string[]
  onChange?: (value: SkillPick[]) => void
  isIncludeMatrixSkills?: boolean
  searchPlaceholder?: string
}

const convertSkillsToTreeValue = (skills?: SkillPick[]) => {
  if (skills && skills?.length) {
    return skills?.length > 1 ? skills.map(i => i.name) : skills?.[0].name
  }
  return
}

function SkillTreeSelect(
  { disabledSkills = [], isIncludeMatrixSkills = true, ...props }: Props,
  ref: any,
) {
  const [value, setValue] = useState<string | string[] | undefined>(
    convertSkillsToTreeValue(props.value),
  )
  const { data, loading } = useGetSkillsQuery({
    onError: message.error,
  })

  useEffect(() => {
    const newValues = convertSkillsToTreeValue(props.value)
    if (value?.toString() !== newValues?.toString()) {
      setValue(newValues)
    }
    //eslint-disable-next-line
  }, [props.value])

  return (
    <TreeSelect
      ref={ref}
      loading={loading}
      multiple={true}
      value={value}
      onChange={value => {
        const skills = [value].flat()
        if (props.onChange) {
          props.onChange(data?.skills?.filter(skill => skills.includes(skill.name)) || [])
        }
        setValue(skills)
      }}
      items={data?.skills
        ?.filter(i => {
          if (isIncludeMatrixSkills) return true
          return !i.isMatrixOnly
        })
        .map(skill => ({
          title: skill.name,
          key: skill.id,
          value: skill.name,
          parentKey: skill.parent?.id,
          disabled: disabledSkills.includes(skill.id),
        }))}
      searchPlaceholder={props.searchPlaceholder || 'Select skills'}
    />
  )
}

export default React.forwardRef(SkillTreeSelect)
