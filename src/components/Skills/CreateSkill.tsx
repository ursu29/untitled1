import React, { useEffect, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import message from '../../message'
import { useCreateSkillMutation, GetSkillsDocument } from '../../queries/skills'
import { CreateSkillInput } from '../../types/graphql'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'
import SkillForm from './SkillForm'
import SkillSelect from './SkillSelect'

export default function CreateSkill() {
  const [skill, setSkill] = useState<CreateSkillInput | null>(null)
  const [createSkill, { loading }] = useCreateSkillMutation({
    refetchQueries: [{ query: GetSkillsDocument }],
    onError: message.error,
    onCompleted: () => message.success('Skill added'),
  })

  useEffect(() => {
    if (loading) {
      message.loading('Creating')
    }
  })

  return (
    <Drawer
      toggler={<Button icon={<PlusOutlined />}>Add skill</Button>}
      drawerLabel="Create a new skill"
      content={
        <SkillForm
          parentSkillSelect={<SkillSelect wide />}
          loading={loading}
          skill={skill}
          onSubmit={(skill, onDone) => {
            if ('id' in skill) return
            setSkill(skill)
            createSkill({ variables: { input: skill }, update: onDone })
          }}
        />
      }
    />
  )
}
