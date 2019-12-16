import React, { useEffect } from 'react'
import Select from '../UI/Select'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Tag } from '../../types'
import query, { QueryType } from '../../queries/getTags'
import gql from 'graphql-tag'
import message from '../../message'

const mutation = gql`
  mutation createTag($input: CreateTagInput) {
    createTag(input: $input) {
      id
      name
      description
    }
  }
`

type TagPick = Pick<Tag, 'id' | 'name' | 'description'>

type MutationType = {
  createTag: TagPick
}

interface Props {
  value?: any
  onChange: (value: TagPick[]) => void
}

function TagSelect({ value, onChange }: Props, ref: any) {
  const { data, loading, error } = useQuery<QueryType>(query, {
    onError: message.error,
  })
  const [mutate, { loading: mutateLoading }] = useMutation<MutationType>(mutation, {
    refetchQueries: [{ query }],
    onCompleted: () => message.success('New tag is added'),
    onError: message.error,
  })

  useEffect(() => {
    if (mutateLoading) {
      message.loading('Adding new tags')
    }
  })

  return (
    <Select
      value={value}
      ref={ref}
      loading={loading || mutateLoading}
      style={{ width: '100%' }}
      placeholder="Select tags"
      mode="tags"
      items={data?.tags.map(tag => ({
        value: tag.name,
        key: tag.name,
      }))}
      onSelect={values => {
        const tagIds = data?.tags.map(i => i.name)
        const newTag = values.find((v: { key: string; value: string }) => !tagIds?.includes(v.key))
        if (newTag) {
          mutate({
            variables: { input: { name: newTag.key } },
            update: () => {
              onChange(
                values.map((value: { key: string; value: string }) => {
                  return {
                    ...value,
                    id: data?.tags.find(i => i.name === value.key)?.id,
                  }
                }),
              )
            },
          })
        }
        onChange(
          values.map((value: { key: string; value: string }) => {
            return {
              ...value,
              id: data?.tags.find(i => i.name === value.key)?.id,
            }
          }),
        )
      }}
    />
  )
}

export default React.forwardRef(TagSelect)