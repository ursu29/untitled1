import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React from 'react'
import { Employee, Project, Skill } from '../../types'
import SkillView from '../UI/Skill'
import UpdateSkill from './UpdateSkill'
import SkillProjects from './SkillProjects'
import SkillExperience from './SkillExperience'

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
  id: Skill['id']
  name: Skill['name']
  description: Skill['description']
  isMatrixOnly: Skill['isMatrixOnly']
  parent: Pick<SkillPick, 'id' | 'name'>
  projects: Pick<Project, 'id' | 'name' | 'code'>
  addedBy: Pick<Employee, 'id' | 'name' | 'email'>
}

interface Props {
  skill: Pick<Skill, 'id'>
}

function SkillPage(props: Props) {
  const variables = { input: { id: props.skill.id } }
  const { data, loading, error } = useQuery<{ skills: SkillPick[] }>(query, {
    variables,
    skip: !props.skill,
  })

  const skill = data?.skills[0]

  return (
    <SkillView
      loading={loading}
      skill={skill}
      projects={<SkillProjects skill={skill} />}
      experience={<SkillExperience skill={{ id: props.skill.id }} />}
      editComponent={
        <UpdateSkill
          refetchQueries={[{ query, variables }]}
          skill={{ ...skill, parent: skill?.parent?.id }}
        />
      }
    />
  )
}

export default SkillPage
