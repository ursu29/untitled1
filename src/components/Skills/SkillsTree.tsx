import React, { useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import Tree from '../UI/Tree'
import { getSkillLink } from '../../paths'
import { useGetSkillsQuery, GetSkillsDocument, useUpdateSkillMutation } from '../../queries/skills'
import message from '../../message'
import CreateSkill from './CreateSkill'

function SkillsTree({ history }: RouteComponentProps) {
  const { data, loading, error } = useGetSkillsQuery()
  const [updateSkill, { loading: mutationLoading }] = useUpdateSkillMutation({
    refetchQueries: [{ query: GetSkillsDocument }],
    onError: message.error,
    onCompleted: () => message.success('Skill added'),
  })

  useEffect(() => {
    if (mutationLoading) {
      message.loading('Adding skill')
    }
  })

  if (error) return <div>Error :(</div>

  return (
    <Tree
      loading={loading}
      controls={<CreateSkill />}
      onDoubleClick={item => {
        history.push(getSkillLink(item.id))
      }}
      items={data?.skills?.map(item => ({
        id: item.id,
        key: item.id,
        title: item.name,
        parent: item.parent?.id,
      }))}
      onDrop={(id, parent) => {
        updateSkill({
          variables: { input: { id, parent: parent || null } },
        })
      }}
    />
  )
}

export default withRouter(SkillsTree)
