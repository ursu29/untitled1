import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useEffect, useState } from 'react'
import message from '../../message'
import getSkills from '../../queries/getSkills'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'
import SkillForm from '../UI/SkillForm'
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
  const [createSkill, { loading }] = useMutation<MutationType>(mutation, {
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
