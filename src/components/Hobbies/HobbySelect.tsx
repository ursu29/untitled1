import React, { useEffect } from 'react'
import message from '../../message'
import { Hobby } from '../../types/graphql'
import {
  GetHobbiesDocument,
  useGetHobbiesQuery,
  useCreateHobbyMutation,
} from '../../queries/hobbies'
import Select from '../UI/Select'

type HobbyPick = Pick<Hobby, 'id' | 'name'>

type Props = {
  value?: HobbyPick[]
  onChange?: (values: HobbyPick[]) => any
  onBlur?: () => any
  defaultOpen?: boolean
  autoFocus?: boolean
  matrixSkillsOnly?: boolean
  allowAddNew?: boolean
  wide?: boolean
  size?: 'large' | 'middle' | 'small'
}

function HobbySelect({ onChange, value, wide, size, ...props }: Props, ref: any) {
  const { data, loading: dataLoading } = useGetHobbiesQuery()
  const [createHobby, { loading: addLoading }] = useCreateHobbyMutation({
    onCompleted: () => message.success('New hobby has been created'),
    onError: message.error,
    refetchQueries: [{ query: GetHobbiesDocument }],
    awaitRefetchQueries: true,
  })
  const hobbies = data?.hobbies || []

  useEffect(() => {
    if (addLoading) {
      message.loading('Adding new hobby')
    }
  }, [addLoading])

  const handleCreateHobby = (name: string, nextValues?: HobbyPick[]) => {
    createHobby({
      variables: {
        input: { name },
      },
      update: (cache, { data }) => {
        const newHobby = data?.createHobby
        if (newHobby && nextValues && onChange) {
          onChange(nextValues.concat([newHobby]))
        }
      },
    })
  }

  return (
    <Select
      ref={ref}
      style={{ width: wide ? '100%' : 150 }}
      autoFocus={!dataLoading && props.autoFocus}
      loading={dataLoading || addLoading}
      size={size}
      value={
        value &&
        value.map(hobby => ({
          key: hobby.id,
          value: hobby.id,
        }))
      }
      mode="tags"
      onBlur={props.onBlur}
      onSelect={(values: { key: string }[]) => {
        const ids = data?.hobbies.map(i => i.id)
        const newHobby = values?.find(v => !ids?.includes(v.key))
        const nextValues = values.map(v => v.key)
        const res = hobbies.filter(h => nextValues.includes(h.id))

        if (newHobby) {
          handleCreateHobby(newHobby.key, res)
        } else if (onChange) {
          onChange(res)
        }
      }}
      items={data?.hobbies.map(hobby => ({
        key: hobby.id,
        value: hobby.name,
      }))}
    />
  )
}

export default React.forwardRef(HobbySelect)
