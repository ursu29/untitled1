import { EditOutlined } from '@ant-design/icons'
import gql from 'graphql-tag'
import { useMutation, useQuery } from '@apollo/react-hooks'
import React from 'react'
import message from '../../message'
import getProject from '../../queries/getProject'
import updateProject from '../../queries/updateProject'
import { Project } from '../../types'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'
import ProjectForm from './ProjectForm'

function UpdateProject({ project }: { project: Partial<Project> }) {
  const { data } = useQuery(
    gql`
      query getProject($id: ID!) {
        project(id: $id) {
          id
          accessEditGlobal
        }
      }
    `,
    { variables: { id: project.id } },
  )

  const [update, { loading }] = useMutation(updateProject, {
    onCompleted: () => message.success('Project is updated'),
    refetchQueries: [{ query: getProject, variables: { id: project.id } }],
    awaitRefetchQueries: true,
    onError: message.error,
  })

  if (!data?.project?.accessEditGlobal) return null

  return (
    <Drawer
      toggler={<Button size="small" icon={<EditOutlined />} type="link"></Button>}
      drawerLabel={'Edit project ' + project?.name}
      content={
        <ProjectForm
          loading={loading}
          item={project}
          onSubmit={async (project: any, onDone: any) => {
            update({
              variables: {
                input: {
                  id: project.id,
                  scrumMasters: project.scrumMasters,
                },
              },
              update: onDone,
            })
          }}
        />
      }
    />
  )
}

export default UpdateProject
