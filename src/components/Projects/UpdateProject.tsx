import { EditOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/react-hooks'
import React, { useState } from 'react'
import message from '../../message'
import updateProject from '../../queries/updateProject'
import { Project } from '../../types'
import { useToken } from '../../utils/withToken'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'
import ProjectForm from './ProjectForm'

function UpdateProject({ project }: { project: Partial<Project> }) {
  const [loading, setLoading] = useState(false)
  const { token } = useToken()
  const [update, { loading: updateLoading }] = useMutation(updateProject, {
    onCompleted: () => message.success('Project is updated'),
    awaitRefetchQueries: true,
    onError: message.error,
  })

  return (
    <Drawer
      toggler={<Button size="small" icon={<EditOutlined />} type="link"></Button>}
      drawerLabel={'Edit project ' + project?.name}
      content={
        <ProjectForm
          loading={loading}
          item={project}
          onSubmit={async (item: any, onDone: any) => {
            // setLoading(true)
            // const permissions = await fetch(`oauth2PermissionGrants`)
            update({
              variables: {
                input: {
                  id: item.id,
                  agileManagers: item.agileManagers,
                  scrumMasters: item.scrumMasters,
                },
              },
              update: onDone,
            })
            // fetch(`https://graph.microsoft.com/v1.0/groups/${project.id}`, {
            //   method: 'PATCH',
            //   body: JSON.stringify({
            //     ext6ea2m2wd_projectDetails: {
            //       agileManagers: 'test2',
            //       scrumMasters: 'test2',
            //     },
            //   }),
            //   headers: {
            //     Authorization: 'Bearer ' + token,
            //     'Content-type': 'application/json; charset=UTF-8',
            //   },
            // })
            //   .then(onDone)
            //   .catch(e => {
            //     console.log(e)
            //   })
            //   .finally(() => setLoading(false))
          }}
        />
      }
    />
  )
}

export default UpdateProject
