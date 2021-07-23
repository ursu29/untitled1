import React, { useState } from 'react'
import { useGetSkillsQuery } from '../../queries/skills'
import { Skill } from '../../types/graphql'
import message from '../../message'
import { Select } from 'antd'

const { Option } = Select

export type SkillPick = Pick<Skill, 'id' | 'name'>

interface Props {
  value?: SkillPick[]
  onChange: (value: SkillPick[]) => void
}

export default function SkillMultiSelect({ value, onChange }: Props) {
  const { data, loading } = useGetSkillsQuery({
    onError: message.error,
  })

  const [userInput, setUserInput] = useState('')

  const getChildren = () => {
    const skills = getFilteredSkills(data?.skills || [], !!userInput.length)
    return skills?.map((el, index) => (
      <Option value={el.id} key={el.id} index={index}>
        {el.name}
      </Option>
    ))
  }

  const filterOption = (inputValue: string, option: any) => {
    return option.children.trim().toLowerCase().includes(inputValue.trim().toLowerCase())
  }

  return (
    <Select
      mode="multiple"
      allowClear
      style={{ width: '100%' }}
      placeholder={loading ? 'Loading...' : 'Select skills'}
      loading={loading}
      onKeyUp={(e: any) => setUserInput(e.target.value.trim())}
      defaultValue={convertSkillsToTreeValue(value)}
      filterOption={filterOption}
      onBlur={() => setUserInput('')}
      onChange={value => {
        onChange(data?.skills?.filter(skill => value.includes(skill.id)) || [])
      }}
    >
      {getChildren()}
    </Select>
  )
}

function convertSkillsToTreeValue(skills?: SkillPick[]) {
  if (skills?.length) {
    return skills?.length > 1 ? skills.map(i => i.name) : skills?.[0].name
  }
  return []
}

function getFilteredSkills(skills?: SkillPick[], hasUserInput: boolean = false) {
  if (skills && (skills?.length || 0) > 10 && !hasUserInput) {
    return skills.slice(0, 10)
  }
  return skills
}
