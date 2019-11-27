import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { Employee, Project, Skill as SkillType } from '../../types'
import Skill from '../UI/Skill'
import UpdateSkill from './UpdateSkill'

const query = gql`
  query getSkill($input: SkillsInput) {
    skills(input: $input) {
      id
      name
      description
      projects {
        id
        name
        code
      }
      parent {
        id
        name
      }
      addedBy {
        id
        name
        email
      }
      isMatrixOnly
    }
  }
`

type SkillPick = {
  id: SkillType['id']
  name: SkillType['name']
  description: SkillType['description']
  isMatrixOnly: SkillType['isMatrixOnly']
  parent: Pick<SkillPick, 'id' | 'name'>
  projects: Pick<Project, 'id' | 'name' | 'code'>
  addedBy: Pick<Employee, 'id' | 'name' | 'email'>
}

function SkillPage({ match }: RouteComponentProps<{ id: string }>) {
  const id = match.params.id

  const variables = { input: { id } }
  const { data, loading, error } = useQuery<{ skills: SkillPick[] }>(query, {
    variables,
    skip: !id,
  })

  const skill = data?.skills[0]

  return (
    <Skill
      loading={loading}
      skill={skill}
      editComponent={
        <UpdateSkill
          refetchQueries={[{ query, variables }]}
          skill={{ ...skill, parent: skill?.parent?.id }}
        />
      }
    />
  )
}

export default withRouter(SkillPage)
