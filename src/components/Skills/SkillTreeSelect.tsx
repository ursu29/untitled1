import { useQuery } from '@apollo/react-hooks'
import React, { useState, useEffect } from 'react'

import query, { QueryType } from '../../queries/getSkills'
import TreeSelect from '../UI/TreeSelect'
import { Skill } from '../../types'
import message from '../../message'

type SkillPick = Pick<Skill, 'id' | 'name'>

interface Props {
  skills?: SkillPick[]
  disabledSkills?: string[]
  onChange?: (value: SkillPick[]) => void
}

const convertSkillsToTreeValue = (skills?: SkillPick[]) => {
  if (skills && skills?.length) {
    return skills?.length > 1 ? skills.map(i => i.name) : skills?.[0].name
  }
  return
}

export default function SkillTreeSelect({ disabledSkills = [], ...props }: Props) {
  const [value, setValue] = useState<string | string[] | undefined>(
    convertSkillsToTreeValue(props.skills),
  )
  const { data, loading } = useQuery<QueryType>(query, {
    onError: message.error,
  })

  useEffect(() => {
    const newValues = convertSkillsToTreeValue(props.skills)
    if (value?.toString() !== newValues?.toString()) {
      setValue(newValues)
    }
  }, [props.skills])

  return (
    <TreeSelect
      loading={loading}
      multiple={true}
      value={value}
      onChange={value => {
        const skills = [value].flat()
        if (props.onChange) {
          props.onChange(data?.skills.filter(skill => skills.includes(skill.name)) || [])
        }
        setValue(skills)
      }}
      items={data?.skills?.map(skill => ({
        title: skill.name,
        key: skill.id,
        value: skill.name,
        parentKey: skill.parent?.id,
        disabled: disabledSkills.includes(skill.id),
      }))}
    />
  )
}
