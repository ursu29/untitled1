import { useQuery } from '@apollo/react-hooks'
import React, { useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import query, { QueryType } from '../../queries/getSkills'
import Tree from '../UI/Tree'
import { getSkillLink } from '../../paths'
import gql from 'graphql-tag'
import getSkills from '../../queries/getSkills'
import { useMutation } from '@apollo/react-hooks'
import message from '../../message'
import CreateSkill from './CreateSkill'

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

function SkillsTree({ history }: RouteComponentProps) {
  const { data, loading, error } = useQuery<QueryType>(query)
  const [updateSkill, { loading: mutationLoading }] = useMutation<MutationType>(mutation, {
    refetchQueries: [{ query: getSkills }],
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
