import React from 'react'
import message from '../../message'
import Drawer from '../UI/Drawer'
import Button from '../UI/Button'
import { HobbyForm } from './HobbyForm'
import { useUpdateHobbyMutation } from '../../queries/hobbies'
import { Hobby } from '../../types/graphql'

type Props = {
  hobby: Hobby
}

export const EditHobbyModal: React.FC<Props> = ({ hobby }) => {
  const [updateHobby, { loading }] = useUpdateHobbyMutation({
    onCompleted: () => message.success('Hobby have been updated'),
    onError: message.error,
  })

  return (
    <Drawer
      toggler={<Button type="link">Edit</Button>}
      drawerLabel={`Edit hobby ${hobby.name}`}
      content={
        <HobbyForm
          loading={loading}
          hobby={hobby}
          onSubmit={(data, onDone) => {
            updateHobby({
              variables: {
                input: { id: hobby.id, ...data },
              },
              update: onDone,
            })
          }}
        />
      }
    />
  )
}
