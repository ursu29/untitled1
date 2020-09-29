import React, { useEffect } from 'react'
import { Button } from 'antd'
import { useToken } from '../../utils/withToken'

function CreateSchemaExtention({ project }: any) {
  const { token } = useToken()

  return null

  const handleClick = () => {
    fetch(`https://graph.microsoft.com/v1.0/schemaExtensions`, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        id: 'projectDetails',
        description: 'Additional parameters for Project',
        targetTypes: ['Group'],
        properties: [
          {
            name: 'agileManagers',
            type: 'String',
          },
          {
            name: 'scrumMasters',
            type: 'String',
          },
        ],
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log('token result creating', data)
      })
  }

  useEffect(() => {
    if (project) {
      fetch(
        `https://graph.microsoft.com/beta/groups/${project.id}?$select=ext6ea2m2wd_projectDetails`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      )
        .then(res => res.json())
        .then(data => {
          console.log('token result', data)
        })
    }

    return () => {
      //
    }
  }, [token, project])

  return (
    <div>
      <Button type="primary" onClick={handleClick}>
        Create Schema Extention
      </Button>
    </div>
  )
}

export default CreateSchemaExtention
