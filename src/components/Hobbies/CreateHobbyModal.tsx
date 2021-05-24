import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
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
    onCompleted: () => message.success('New hobby have been created'),
    onError: message.error,
    refetchQueries,
  })

  return (
    <Drawer
      toggler={<Button icon={<PlusOutlined />}>Create hobby</Button>}
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
