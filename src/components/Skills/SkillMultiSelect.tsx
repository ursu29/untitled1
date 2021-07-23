import React, { useState } from 'react'
import { useGetSkillsQuery } from '../../queries/skills'
import { Skill } from '../../types/graphql'
import message from '../../message'
import { Select } from 'antd'

const { Option } = Select

type SkillPick = Pick<Skill, 'id' | 'name'>

interface Props {
  value?: SkillPick[]
  onChange?: (value: SkillPick[]) => void
}

export default function SkillMultiSelect({ value, onChange }: Props) {
  const { data, loading } = useGetSkillsQuery({
    onError: message.error,
  })

  const [userInput, setUserInput] = useState('')

  const getChildren = () => {
    const skills = getFilteredSkills(data?.skills || [], value || [], !!userInput.length)
    return skills?.map((el, index) => (
      <Option value={el.id} key={el.id} index={index}>
        {el.name}
      </Option>
    ))
  }

  const filterOption = (inputValue: string, option: any) => {
    return option.children.trim().toLowerCase().includes(inputValue.trim().toLowerCase())
  }

  const handleChange = (value: any) => {
    onChange && onChange(data?.skills?.filter(skill => value.includes(skill.id)) || [])
  }

  if (!getChildren()?.length) return null

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
      onChange={handleChange}
    >
      {getChildren()}
    </Select>
  )
}

function convertSkillsToTreeValue(skills?: SkillPick[]) {
  if (skills?.length) {
    return skills?.length > 1 ? skills.map(i => i.id) : [skills?.[0].id]
  }
  return []
}

function getFilteredSkills(
  skills: SkillPick[],
  selected: SkillPick[],
  hasUserInput: boolean = false,
) {
  if (skills && (skills?.length || 0) > 10 && !hasUserInput) {
    return skills.filter(
      (skill: SkillPick, index) => selected.map(s => s.id).includes(skill.id) || index < 10,
    )
  }
  return skills
}
