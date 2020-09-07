import React, { useState } from 'react'
import { Project } from '../../types'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'
import ProjectForm from './ProjectForm'

function UpdateProject({ project }: { project: Partial<Project> }) {
  const [loading, setLoading] = useState(false)

  return (
    <Drawer
      toggler={<Button size="small" icon="edit" type="link"></Button>}
      drawerLabel={'Edit project ' + project?.name}
      content={
        <ProjectForm
          loading={loading}
          item={project}
          onSubmit={async (item: any, onDone: any) => {
            const token = localStorage.getItem('new_token')
            console.log('TOKEN', token)
            setLoading(true)
            // const permissions = await fetch(`oauth2PermissionGrants`)

            fetch(`https://graph.microsoft.com/v1.0/groups/${project.id}`, {
              method: 'PATCH',
              body: JSON.stringify({
                description: item.name + ' //' + item.description,
              }),
              headers: {
                Authorization: 'Bearer ' + token,
                'Content-type': 'application/json; charset=UTF-8',
              },
            })
              .then(onDone)
              .catch(e => {
                console.log(e)
              })
              .finally(() => setLoading(false))
          }}
        />
      }
    />
  )
}

export default UpdateProject
