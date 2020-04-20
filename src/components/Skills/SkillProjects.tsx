import React from 'react'
import { Skill, Project } from '../../types'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import ProjectTagList from '../Projects/ProjectTagList'
import Section from '../UI/Section'
import Skeleton from '../UI/Skeleton'

interface Props {
  skill?: Pick<Skill, 'id'>
}

const query = gql`
  query getSkillProjects($input: EmployeesInput) {
    skills(input: $input) {
      id
      projects {
        id
        name
        code
      }
    }
  }
`

type SkillPick = Pick<Skill, 'id'> & {
  projects: Pick<Project, 'id' | 'name' | 'code'>[]
}

type QueryType = {
  skills: SkillPick[]
}

export default function SkillProjects(props: Props) {
  const { data, loading, error } = useQuery<QueryType>(query, {
    variables: { input: { id: props.skill?.id } },
    skip: !props.skill,
  })

  if (!props.skill) return null

  if (error) return <div>Error :(</div>

  const projects = data?.skills?.[0]?.projects

  return (
    <Skeleton loading={loading} active line>
      {projects && projects?.length > 0 && (
        <Section title="Projects">
          <ProjectTagList small projects={projects} />
        </Section>
      )}
    </Skeleton>
  )
}
