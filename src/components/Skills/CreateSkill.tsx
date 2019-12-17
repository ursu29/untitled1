import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import getSkills from '../../queries/getSkills'
import { Skill } from '../../types'
import Drawer from '../UI/Drawer'
import Button from '../UI/Button'
import SkillForm from '../UI/SkillForm'
import message from '../../message'
import SkillSelect from './SkillSelect'

const mutation = gql`
  mutation createSkill($input: CreateSkillInput) {
    createSkill(input: $input) {
      id
    }
  }
`

type MutationType = {
  createSkill: {
    id: string
  }
}

export default function CreateSkill() {
  const [skill, setSkill] = useState<any>(null)
  const [createSkill, { loading, error }] = useMutation<MutationType>(mutation, {
    refetchQueries: [{ query: getSkills }],
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
      toggler={<Button icon="plus">Add skill</Button>}
      drawerLabel="Create a new skill"
      content={
        <SkillForm
          parentSkillSelect={<SkillSelect wide />}
          loading={loading}
          skill={skill}
          onSubmit={(skill: any, onDone: any) => {
            setSkill(skill)
            createSkill({ variables: { input: skill }, update: onDone })
          }}
        />
      }
    />
  )
}
