import React, { useState } from 'react'
import SkillDrawer from '../UI/SkillDrawer'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import getSkills from '../../queries/getSkills'
import { Skill } from '../../types'

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
    onError: () => {
      console.info('createSkill error', error)
    },
  })
  return (
    <SkillDrawer
      togglerLabel="Add"
      icon="plus"
      drawerLabel="Create a new skill"
      skill={skill}
      loading={loading}
      onSubmit={(skill, onDone) => {
        setSkill(skill)
        createSkill({ variables: { input: skill }, update: onDone })
      }}
    />
  )
}
