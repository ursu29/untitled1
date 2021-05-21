import { RefetchQueryDescription } from '@apollo/client/core/watchQueryOptions'
import React, { useEffect, useState } from 'react'
import message from '../../message'
import { GetSkillsDocument, useUpdateSkillMutation } from '../../queries/skills'
import { UpdateSkillInput } from '../../types/graphql'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'
import SkillForm from './SkillForm'

interface Props {
  skill?: UpdateSkillInput
  refetchQueries: RefetchQueryDescription
}

export default function UpdateSkill({ refetchQueries, ...props }: Props) {
  const [skill, setSkill] = useState<UpdateSkillInput | null>(props.skill || null)
  const [updateSkill, { loading }] = useUpdateSkillMutation({
    refetchQueries: [{ query: GetSkillsDocument }, ...refetchQueries],
    onError: message.error,
    onCompleted: () => message.success('Skill updated'),
  })

  useEffect(() => {
    if (loading) {
      message.loading('Updating')
    }
  })

  return (
    <Drawer
      toggler={<Button size="small" icon="edit" type="link" />}
      drawerLabel={'Edit skill ' + skill?.name}
      content={
        <SkillForm
          loading={loading}
          skill={skill}
          onSubmit={(skill, onDone) => {
            if ('id' in skill) {
              setSkill(skill)
              updateSkill({ variables: { input: skill }, update: onDone })
            }
          }}
        />
      }
    />
  )
}
