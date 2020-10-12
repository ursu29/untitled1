import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useEffect, useState } from 'react'
import { CheckOutlined, EditOutlined } from '@ant-design/icons'
import message from '../../message'
import query, { QueryType } from '../../queries/getProjectSkills'
import { Project, Skill } from '../../types'
import SkillTreeSelect from '../Skills/SkillTreeSelect'
import Button from '../UI/Button'
import Section from '../UI/Section'
import Skeleton from '../UI/Skeleton'
import SkillTag from '../Skills/SkillTag'

const mutation = gql`
  mutation updateProjectSkills($input: UpdateProjectSkillsInput) {
    updateProjectSkills(input: $input) {
      id
    }
  }
`

type SkillsPick = QueryType['project']['skills']
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
    const skills = data?.project?.skills
    if (skills?.toString() !== selectedSkills?.toString()) {
      setSelectedSkills(skills)
    }
    // eslint-disable-next-line
  }, [data])

  const project = data?.project
  const editable = project?.access.write
  const skills = project?.skills

  const showSelect = editable && edit

  return (
    <Section
      title={
        <div>
          Technologies{' '}
          {editable && (
            <Button
              size="small"
              icon={edit ? <CheckOutlined /> : <EditOutlined />}
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
        {showSelect && <SkillTreeSelect value={selectedSkills} onChange={setSelectedSkills} />}
        {!showSelect && <SkillTags skills={skills} />}
      </Skeleton>
    </Section>
  )
}
