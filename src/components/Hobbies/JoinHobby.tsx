import React from 'react'
import { Button } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import message from '../../message'
import { HobbyFullFragment, useJoinHobbyMutation } from '../../queries/hobbies'

type Props = {
  hobby: HobbyFullFragment
  employeeId: string
}

export const JoinHobby: React.FC<Props> = ({ hobby, employeeId }) => {
  const [joinHobby, { loading }] = useJoinHobbyMutation({
    onCompleted: data => {
      const name = data.joinHobby?.name || 'Unknown'
      message.success(
        data.joinHobby?.isMember ? `You join the "${name}" hobby` : `You leave the "${name}" hobby`,
      )
    },
    onError: message.error,
  })

  const handleJoin = () => {
    joinHobby({
      variables: {
        input: {
          id: hobby.id,
          join: !hobby.isMember,
        },
      },
      update: cache => {
        // invalidate hobbies for current user
        cache.evict({
          id: `Employee:${employeeId}`,
          fieldName: 'hobbies',
        })
        cache.gc()
      },
    })
  }

  return (
    <Button
      onClick={handleJoin}
      icon={hobby.isMember ? <MinusOutlined /> : <PlusOutlined />}
      disabled={loading}
    >
      {hobby.isMember ? 'Leave' : 'Join'}
    </Button>
  )
}
