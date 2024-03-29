import React from 'react'
import { RefetchQueryDescription } from '@apollo/client/core/watchQueryOptions'
import message from '../../message'
import Drawer from '../UI/Drawer'
import Button from '../UI/Button'
import { HobbyForm } from './HobbyForm'
import { useCreateHobbyMutation } from '../../queries/hobbies'

type Props = {
  refetchQueries: RefetchQueryDescription
}

export const CreateHobbyModal: React.FC<Props> = ({ refetchQueries }) => {
  const [createHobby, { loading }] = useCreateHobbyMutation({
    onCompleted: () => message.success('New hobby has been created'),
    onError: message.error,
    refetchQueries,
  })

  return (
    <Drawer
      toggler={<Button type="primary">Create hobby</Button>}
      drawerLabel="Create a new hobby"
      content={
        <HobbyForm
          loading={loading}
          onSubmit={(data, onDone) => {
            createHobby({
              variables: {
                input: data,
              },
              update: onDone,
            })
          }}
        />
      }
    />
  )
}
