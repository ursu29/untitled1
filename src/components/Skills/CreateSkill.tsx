import { PlusOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import message from '../../message'
import { GetSkillsDocument, useCreateSkillMutation } from '../../queries/skills'
import { CreateSkillInput } from '../../types/graphql'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'
import SkillForm from './SkillForm'

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
      toggler={
        <Button icon={<PlusOutlined />} data-cy="addSkill">
          Add skill
        </Button>
      }
      drawerLabel="Create a new skill"
      content={
        <SkillForm
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
