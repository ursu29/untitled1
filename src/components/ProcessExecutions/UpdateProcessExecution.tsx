import { useMutation } from '@apollo/client'
import { Button, Form } from 'antd'
import React, { useState } from 'react'
import message from '../../message'
import { QueryType } from '../../queries/getProcessExecution'
import updateProcessExecution from '../../queries/updateProcessExecution'
import LocationSelect from '../Locations/LocationSelect'
import ProjectSelect from '../Projects/ProjectSelect'
import Drawer from '../UI/Drawer.new'

export default function UpdateProcessExecution({
  processExecution,
  refetchQueries,
  processExecution: { status },
}: {
  processExecution: QueryType['processExecutions'][0]
  refetchQueries: any
}) {
  const [showDrawer, setShowDrawer] = useState(false)
  const [form] = Form.useForm()
  const [update, { loading }] = useMutation(updateProcessExecution, {
    refetchQueries,
    awaitRefetchQueries: true,
    onCompleted: () => {
      message.success('Updated')
      setShowDrawer(false)
    },
    onError: message.error,
  })

  const handleSubmit = (values: any) => {
    update({ variables: { input: { id: processExecution.id, ...values } } })
  }

  return (
    <>
      {status === 'RUNNING' || status === 'HOLDING' ? (
        <Button onClick={() => setShowDrawer(!showDrawer)}>Edit</Button>
      ) : null}

      <Drawer
        title="Edit process execution"
        visible={showDrawer}
        onClose={() => setShowDrawer(false)}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            ...processExecution,
            project: processExecution.project?.id,
            projectFrom: processExecution.projectFrom?.id,
            projectTo: processExecution.projectTo?.id,
          }}
        >
          {processExecution.process.type !== 'ROTATION' && (
            <Form.Item label="Project" name="project">
              <ProjectSelect
                onChange={(project: any) => console.log(project)}
                wide
                placeholder="Project"
                allowClear
              />
            </Form.Item>
          )}
          {processExecution.process.type === 'ROTATION' && (
            <>
              <Form.Item label="Project from" name="projectFrom">
                <ProjectSelect
                  onChange={(project: any) => console.log(project)}
                  wide
                  placeholder="Project"
                  allowClear
                />
              </Form.Item>
              <Form.Item label="Project to" name="projectTo">
                <ProjectSelect
                  onChange={(project: any) => console.log(project)}
                  wide
                  placeholder="Project"
                  allowClear
                />
              </Form.Item>
            </>
          )}
          <Form.Item label="Location" name="locations">
            <LocationSelect mode="multiple" wide />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              style={{ marginTop: '10px' }}
              data-cy="save"
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  )
}
