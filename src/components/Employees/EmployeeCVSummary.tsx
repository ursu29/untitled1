import { Input, Form, Row, Col, Typography } from 'antd'
import React, { useEffect } from 'react'
import message from '../../message'
import { CurriculumVitae, Employee, Skill } from '../../types/graphql'
import { useUpdateCvMutation } from '../../queries/cv'
import SkillsCollapsed from '../UI/SkillsCollapsed'
import AboutTooltip from '../UI/AboutTooltip'

type EmployeePick = Pick<Employee, 'id'>
type CVPick = Pick<CurriculumVitae, 'id' | 'summary' | 'languages'>
type SkillPick = Pick<Skill, 'id' | 'name' | 'description'>

type FormValues = {
  summary: string
}

type FormProps = {
  editable?: boolean
  employee: EmployeePick
  cv?: CVPick | null
}

const CVForm = ({ editable, employee, cv }: FormProps) => {
  const [form] = Form.useForm<FormValues>()
  const [update, { loading }] = useUpdateCvMutation({
    onCompleted: () => message.success('Summary has been updated'),
    onError: message.error,
  })

  useEffect(() => {
    if (loading) {
      message.loading('Updating summary')
    }
  })

  return (
    <Form
      form={form}
      name="employee-cv"
      labelCol={{ span: 24, offset: 0 }}
      onFinish={values => {
        update({
          variables: {
            input: {
              employee: employee.id,
              id: cv?.id,
              summary: values.summary,
            },
          },
        })
      }}
    >
      <Form.Item name="summary" label="Summary" initialValue={cv?.summary}>
        {editable ? (
          <Input.TextArea autoSize={{ minRows: 4 }} onBlur={form.submit} />
        ) : (
          <Typography.Text>{cv?.summary}</Typography.Text>
        )}
      </Form.Item>
    </Form>
  )
}

type Props = {
  editable?: boolean
  employee: EmployeePick
  cv?: CVPick | null
  skills?: SkillPick[] | null
}

const EmployeeCVSummary = ({ editable, employee, cv, skills }: Props) => {
  const [update, { loading }] = useUpdateCvMutation({
    onCompleted: () => message.success('Languages have been updated'),
    onError: message.error,
  })
  useEffect(() => {
    if (loading) {
      message.loading('Updating languages')
    }
  })
  return (
    <>
      <Row gutter={16}>
        <Col sm={12}>
          <CVForm editable={editable} employee={employee} cv={cv} />
        </Col>
        <Col sm={12}>
          <AboutTooltip title="Generated according Confident In and Experienced skills in your profile">
            <div style={{ height: 32, display: 'inline-flex', alignItems: 'center' }}>
              Major skills
            </div>
          </AboutTooltip>
          <SkillsCollapsed skills={skills || []} amount={15} />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: '-8px', marginBottom: '16px' }}>
        <Col sm={12}>
          <div
            style={{
              height: 32,
              marginBottom: '6px',
            }}
          >
            Languages
          </div>
          {editable ? (
            <Input
              defaultValue={cv?.languages || ''}
              onBlur={event =>
                update({
                  variables: {
                    input: {
                      id: cv?.id,
                      employee: employee.id,
                      languages: event.target.value,
                    },
                  },
                })
              }
            />
          ) : (
            <Typography.Text>{cv?.languages}</Typography.Text>
          )}
        </Col>
      </Row>
    </>
  )
}

export default EmployeeCVSummary
