import React from 'react'
import { useGetSkillsDetailedQuery, GetSkillsDetailedDocument } from '../../queries/skills'
import { Skill } from '../../types/graphql'
import SkillView from './Skill'
import SkillExperience from './SkillExperience'
import SkillProjects from './SkillProjects'
import UpdateSkill from './UpdateSkill'

interface Props {
  skill: Pick<Skill, 'id'>
}

function SkillPage(props: Props) {
  const variables = { input: { id: props.skill.id } }
  const { data, loading } = useGetSkillsDetailedQuery({
    variables,
    skip: !props.skill,
  })

  const skill = data?.skills?.[0]

  return (
    <SkillView
      loading={loading}
      skill={skill}
      projects={<SkillProjects skill={skill} />}
      experience={<SkillExperience skill={{ id: props.skill.id }} />}
      editComponent={
        <UpdateSkill
          refetchQueries={[{ query: GetSkillsDetailedDocument, variables }]}
          skill={skill && { ...skill, parent: skill?.parent?.id }}
        />
      }
    />
  )
}

export default SkillPage
