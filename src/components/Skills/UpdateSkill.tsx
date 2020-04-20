import { useMutation } from '@apollo/react-hooks'
import { RefetchQueryDescription } from 'apollo-client/core/watchQueryOptions'
import gql from 'graphql-tag'
import React, { useEffect, useState } from 'react'
import message from '../../message'
import getSkills from '../../queries/getSkills'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'
import SkillForm from './SkillForm'
import SkillSelect from './SkillSelect'

const mutation = gql`
  mutation updateSkill($input: UpdateSkillInput) {
    updateSkill(input: $input) {
      id
    }
  }
`

type MutationType = {
  updateSkill: {
    id: string
  }
}

type SkillPick = any

interface Props {
  skill?: SkillPick
  refetchQueries: RefetchQueryDescription
}

export default function UpdateSkill({ refetchQueries, ...props }: Props) {
  const [skill, setSkill] = useState<SkillPick | undefined>(props.skill)
  const [updateSkill, { loading }] = useMutation<MutationType>(mutation, {
    refetchQueries: [{ query: getSkills }, ...refetchQueries],
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
      toggler={<Button size="small" icon="edit" type="link"></Button>}
      drawerLabel={'Edit skill ' + skill?.name}
      content={
        <SkillForm
          loading={loading}
          skill={skill}
          parentSkillSelect={<SkillSelect wide />}
          onSubmit={(skill: any, onDone: any) => {
            setSkill(skill)
            updateSkill({ variables: { input: skill }, update: onDone })
          }}
        />
      }
    />
  )
}
