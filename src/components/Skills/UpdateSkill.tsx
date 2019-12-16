import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import getSkills from '../../queries/getSkills'
import { Skill, Project, Employee } from '../../types'
import Drawer from '../UI/Drawer'
import SkillForm from '../UI/SkillForm'
import message from '../../message'
import Button from '../UI/Button'
import SkillSelect from './SkillSelect'
import { RefetchQueryDescription } from 'apollo-client/core/watchQueryOptions'

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
  const [updateSkill, { loading, error }] = useMutation<MutationType>(mutation, {
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
      toggler={<Button icon="edit">Edit skill</Button>}
      drawerLabel={'Edit a skill ' + skill?.name}
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
