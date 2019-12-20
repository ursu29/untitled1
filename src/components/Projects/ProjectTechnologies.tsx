import React, { useState, useEffect } from 'react'
import query, { QueryType } from '../../queries/getProjectSkills'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Project, Skill } from '../../types'
import Skeleton from '../UI/Skeleton'
import Section from '../UI/Section'
import SkillTreeSelect from '../Skills/SkillTreeSelect'
import SkillTag from '../UI/SkillTag'
import PageContent from '../UI/PageContent'
import Button from '../UI/Button'
import gql from 'graphql-tag'
import message from '../../message'

const mutation = gql`
  mutation updateProjectSkills($input: UpdateProjectSkillsInput) {
    updateProjectSkills(input: $input) {
      id
    }
  }
`

type SkillsPick = QueryType['projects'][0]['skills']
function SkillTags({ skills }: { skills?: SkillsPick }) {
  if (!skills?.length) return <div>No technologies yet</div>
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {skills?.map(skill => (
        <SkillTag key={skill.id} skill={skill} />
      ))}
    </div>
  )
}

interface Props {
  project: Pick<Project, 'id'>
}

export default function ProjectTechnologies(props: Props) {
  const variables = { input: { id: props.project.id } }

  const [selectedSkills, setSelectedSkills] = useState<Pick<Skill, 'id' | 'name'>[] | undefined>([])
  const [edit, toggleEdit] = useState(false)
  const { data, loading } = useQuery<QueryType>(query, { variables })

  const [mutate, { loading: mutateLoading }] = useMutation(mutation, {
    onCompleted: () => message.success('Technologies updated'),
    onError: message.error,
    refetchQueries: [{ query, variables }],
  })

  useEffect(() => {
    if (mutateLoading) {
      message.loading('Updating')
    }
  }, [mutateLoading])

  useEffect(() => {
    const skills = data?.projects?.[0].skills
    if (skills?.toString() !== selectedSkills?.toString()) {
      setSelectedSkills(skills)
    }
  }, [data])

  const project = data?.projects?.[0]
  const editable = project?.access.write
  const skills = project?.skills

  const showSelect = editable && edit

  return (
    <PageContent>
      <Section
        title={
          <div>
            Technologies{' '}
            {editable && (
              <Button
                size="small"
                icon={edit ? 'check' : 'edit'}
                type="link"
                onClick={() => {
                  if (edit) {
                    mutate({
                      variables: {
                        input: {
                          project: props.project.id,
                          skills: (selectedSkills || []).map((i: any) => i.id),
                        },
                      },
                    })
                  }
                  toggleEdit(!edit)
                }}
              />
            )}
          </div>
        }
      >
        <Skeleton loading={loading || mutateLoading} active line>
          {showSelect && <SkillTreeSelect skills={selectedSkills} onChange={setSelectedSkills} />}
          {!showSelect && <SkillTags skills={skills} />}
        </Skeleton>
      </Section>
    </PageContent>
  )
}
