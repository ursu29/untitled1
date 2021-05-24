import { useMutation, useQuery, gql } from '@apollo/client'
import React from 'react'
import message from '../../message'
import getProject from '../../queries/getProject'
import updateProject from '../../queries/updateProject'
import Button from '../UI/Button'
import Drawer from '../UI/Drawer'
import ProjectForm from './ProjectForm'
import { ProjectPick } from '../../queries/getProjectByCode'

function UpdateProject({ project }: { project: ProjectPick }) {
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
      toggler={<Button type="link">Edit</Button>}
      drawerLabel={'Edit project ' + project?.name}
      content={
        <ProjectForm
          loading={loading}
          item={project}
          onSubmit={async (project: ProjectPick, onDone: any) => {
            update({
              variables: {
                input: {
                  id: project?.id,
                  scrumMasters: project?.scrumMasters,
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
