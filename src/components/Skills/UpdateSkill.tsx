import React, { useState } from 'react'
import SkillDrawer from '../UI/SkillDrawer'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import getSkills from '../../queries/getSkills'
import { Skill, Project, Employee } from '../../types'
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
    onError: () => {
      console.info('updateSkill error', error)
    },
  })
  return (
    <SkillDrawer
      togglerLabel="Edit"
      icon="edit"
      drawerLabel={'Edit a skill ' + skill?.name}
      skill={skill}
      loading={loading}
      onSubmit={(skill, onDone) => {
        setSkill(skill)
        updateSkill({ variables: { input: skill }, update: onDone })
      }}
    />
  )
}
