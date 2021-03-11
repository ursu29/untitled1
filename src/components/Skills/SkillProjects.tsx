import React from 'react'
import { useGetSkillProjectsQuery } from '../../queries/skills'
import { Skill } from '../../types/graphql'
import ProjectTagList from '../Projects/ProjectTagList'
import Section from '../UI/Section'
import Skeleton from '../UI/Skeleton'

interface Props {
  skill?: Pick<Skill, 'id'>
}

export default function SkillProjects(props: Props) {
  const { data, loading, error } = useGetSkillProjectsQuery({
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
