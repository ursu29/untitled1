import { useQuery, useMutation, gql } from "@apollo/client";
import React, { useEffect } from 'react'
import Select from '../UI/Select'
import { Tag } from '../../types'
import query, { QueryType } from '../../queries/getTags'
import message from '../../message'

const mutation = gql`
  mutation createTag($input: CreateTagInput!) {
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
  onChange?: (value: { key: string; label: string; id: string }[]) => void
  allowAddNew?: boolean
  multiple?: boolean
}

function TagSelect({ value, allowAddNew, multiple, onChange }: Props, ref: any) {
  const { data, loading } = useQuery<QueryType>(query, {
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
    <div data-cy="selectTag">
      <Select
        value={value}
        ref={ref}
        loading={loading || mutateLoading}
        style={{ width: '100%' }}
        placeholder="Select tags"
        mode={allowAddNew ? 'tags' : multiple ? 'multiple' : null}
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
              update: (_, { data }) => {
                onChange &&
                  onChange(
                    values.map((value: { key: string; value: string }) => {
                      return {
                        ...value,
                        id: data?.createTag.id,
                      }
                    }),
                  )
              },
            })
          }
          onChange &&
            onChange(
              values.map((value: { key: string; value: string }) => {
                const tag = data?.tags.find(i => i.name === value.key)
                return {
                  ...value,
                  id: tag?.id,
                  name: tag?.name,
                }
              }),
            )
        }}
      />
    </div>
  )
}

export default React.forwardRef(TagSelect)
