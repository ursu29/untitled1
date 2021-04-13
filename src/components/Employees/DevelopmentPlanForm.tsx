import { Checkbox, Col, Form, Input, Row, Typography } from 'antd'
import React, { useEffect } from 'react'
import { DevelopmentPlan } from '../../types'
import DevelopmentGoals from './DevelopmentGoals'
import './styles.css'

const { Title, Paragraph } = Typography

type PlanPick = Exclude<DevelopmentPlan, 'employee'>

interface Props {
  value?: PlanPick
  onChange: (value: PlanPick) => void
  locked?: boolean
  resetFields?: boolean
}

function DevelopmentPlanForm({ value, onChange, locked, resetFields }: Props) {
  const [form] = Form.useForm()

  useEffect(() => {
    form.resetFields()
  }, [resetFields])

  const handleSubmit = (values: any) => {
    onChange({
      id: value?.id,
      ...values,
      actualGoals: values.actualGoals?.map(({ __typename, ...i }: any) => i),
      previousGoals: values.previousGoals?.map(({ __typename, ...i }: any) => i),
    })
  }

  return (
    <Form
      form={form}
      data-cy="allEvaluation"
      layout="vertical"
      initialValues={value}
      onChange={() => {
        handleSubmit(form.getFieldsValue())
      }}
      className="custom-disabled-input"
    >
      <div data-cy="evaluation-form">
        <Title level={3}>Look Back</Title>
        <Paragraph style={{ maxWidth: 550 }}>
          Capture some positive and negative statements on last reporting period i.e. last year or
          since the last talk. Points can come from management or the employee. Both sides should
          agree on the points. If there is no agreement it should be marked in the text
        </Paragraph>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Positive" name="lookBackPositive">
              <Input.TextArea rows={4} onBlur={form.submit} disabled={locked} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Negative" name="lookBackNegative">
              <Input.TextArea rows={4} onBlur={form.submit} disabled={locked} />
            </Form.Item>
          </Col>
        </Row>
      </div>
      <Form.Item name="lookForward">
        <Title level={3}>Look Forward</Title>
        <Paragraph style={{ maxWidth: 550 }}>
          Capture interest in the project and how the future is perceived from a project point of
          view. I.e. would the employee like to stay in the project, is happy with current position
          in the project, would like to change project, etc
        </Paragraph>
        <Input.TextArea rows={4} onBlur={form.submit} disabled={locked} />
      </Form.Item>

      <Title level={3}>Previous Goals</Title>
      <Paragraph style={{ maxWidth: 550 }}>
        Please copy here a list of goals from previous period. List includes goals from regular
        Performance development and from the Guild contribution. Report have you achieved success
        criteria for this goal. It is fine if goal appeared to be unnecessary and not achieved -
        just leave a comment regarding it. Plans and goals can change with time and circumstances.
        Important is that plans are being discussed and aligned with a Project, Company goals.
      </Paragraph>
      <Form.Item name="previousGoals">
        <DevelopmentGoals
          showAchievedSwitch
          onChange={values => {
            console.log(value)
            form.setFieldsValue({
              previousGoals: values,
            })
            form.submit()
          }}
          disabled={locked || false}
        />
      </Form.Item>
      <div style={{ marginBottom: 16 }}>
        <Title level={3}>Areas of Interests</Title>
        <Paragraph style={{ maxWidth: 550 }}>
          Below there is a list of roles in three main categories: technical, business analysis and
          agile coaching/leading skills. Please note it is fine to not define any goals if the
          employee is happy where he is and wants to keep as is state.
        </Paragraph>
        <Title level={4}>Technical</Title>
        <Row gutter={16}>
          <Col span={7}>
            <div>
              <Form.Item name={['developmentRoles', 'solutionArchitect']} valuePropName="checked">
                <Checkbox disabled={locked}>Solution Architect (UI and/or Backend)</Checkbox>
              </Form.Item>
            </div>
            <div>
              <Form.Item name={['developmentRoles', 'webDeveloper']} valuePropName="checked">
                <Checkbox disabled={locked}>Web/UI Developer</Checkbox>
              </Form.Item>
            </div>
            <div>
              <Form.Item name={['developmentRoles', 'javaDeveloper']} valuePropName="checked">
                <Checkbox disabled={locked}>Java Develope</Checkbox>
              </Form.Item>
            </div>
            <div>
              <Form.Item name={['developmentRoles', 'dotnetDeveloper']} valuePropName="checked">
                <Checkbox disabled={locked}>.NET Developer (C#)</Checkbox>
              </Form.Item>
            </div>
            <div>
              <Form.Item name={['developmentRoles', 'uxExpert']} valuePropName="checked">
                <Checkbox disabled={locked}>UI/UX Expert</Checkbox>
              </Form.Item>
            </div>
          </Col>
          <Col span={7}>
            <div>
              <Form.Item name={['developmentRoles', 'devOps']} valuePropName="checked">
                <Checkbox disabled={locked}>DevOps</Checkbox>
              </Form.Item>
            </div>
            <div>
              <Form.Item
                name={['developmentRoles', 'infrastructureArchitect']}
                valuePropName="checked"
              >
                <Checkbox disabled={locked}>Infrastructure Architect</Checkbox>
              </Form.Item>
            </div>
            <div>
              <Form.Item name={['developmentRoles', 'manualQA']} valuePropName="checked">
                <Checkbox disabled={locked}>Manual QA</Checkbox>
              </Form.Item>
            </div>
            <div>
              <Form.Item name={['developmentRoles', 'automationQA']} valuePropName="checked">
                <Checkbox disabled={locked}>Automation QA</Checkbox>
              </Form.Item>
            </div>
          </Col>
        </Row>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Title level={4}>Agile Coaching / Leading skills</Title>
        <Row>
          <div>
            <Form.Item name={['developmentRoles', 'scrumMaster']} valuePropName="checked">
              <Checkbox disabled={locked}>Scrum Master</Checkbox>
            </Form.Item>
          </div>
          <div>
            <Form.Item name={['developmentRoles', 'teamLead']} valuePropName="checked">
              <Checkbox disabled={locked}>Tech Lead</Checkbox>
            </Form.Item>
          </div>
          <div>
            <Form.Item name={['developmentRoles', 'agileCoach']} valuePropName="checked">
              <Checkbox disabled={locked}>Agile Coach</Checkbox>
            </Form.Item>
          </div>
          <div>
            <Form.Item name={['developmentRoles', 'agileCoach']} valuePropName="checked">
              <Checkbox disabled={locked}>Agile Manager</Checkbox>
            </Form.Item>
          </div>
        </Row>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Title level={4}>Business Analysis</Title>
        <Row>
          <div>
            <Form.Item name={['developmentRoles', 'mathematician']} valuePropName="checked">
              <Checkbox disabled={locked}>Mathematician / Quant</Checkbox>
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name={['developmentRoles', 'actuarialBusinessAnalyst']}
              valuePropName="checked"
            >
              <Checkbox disabled={locked}>Actuarial Business Analyst</Checkbox>
            </Form.Item>
          </div>
          <div>
            <Form.Item name={['developmentRoles', 'productOwner']} valuePropName="checked">
              <Checkbox disabled={locked}>Product Owner</Checkbox>
            </Form.Item>
          </div>
          <div>
            <Form.Item name={['developmentRoles', 'dataAnalyst']} valuePropName="checked">
              <Checkbox disabled={locked}>Data Analyst</Checkbox>
            </Form.Item>
          </div>
        </Row>
      </div>
      <Form.Item name="longTermGoals">
        <Title level={3}>Long Term goals (more than a year)</Title>
        <Paragraph style={{ maxWidth: 550 }}>
          Capture what long term goals the employee has in this regards. As an example “I want to
          become Senior Property Insurance Business Analyst in 2 years” would look fine in this
          section, but format is not strict
        </Paragraph>
        <Input.TextArea
          rows={4}
          placeholder={locked ? '' : 'Describe new goal'}
          onBlur={handleSubmit}
          disabled={locked}
        />
      </Form.Item>
      <Title level={3}>Short Term goals (nearest 6 months, i.e. up to the next assessment)</Title>
      <Paragraph style={{ maxWidth: 550 }}>
        Capture what goals employee has for nearest year and what actions are required to reach the
        goal, maybe some intermediary steps are required. Goals should be clearly specified, should
        be realistic, should have clear timeframe, should have objective Success criteria. Capture
        also how guild activities could help to reach the goal.) Please add in comments if you plan
        to spend Guild time to achieve this goal and if possible, how much time do you plan to
        spend.
      </Paragraph>
      <Form.Item name="actualGoals">
        <DevelopmentGoals
          showAchievedSwitch={false}
          onChange={values => {
            console.log(values)
            form.setFieldsValue({
              actualGoals: values,
            })
            form.submit()
          }}
          disabled={locked || false}
        />
      </Form.Item>
      <div style={{ marginBottom: 20 }}>
        <Title level={3}>Guild contribution</Title>
        <Paragraph style={{ maxWidth: 550 }}>
          In general each employee has in average 20 person days per year for guild activities. This
          amount of time is agreed with our clients. The work should be scheduled in blocks of 1-2
          weeks wherever possible to be able to concentrate on a result.
        </Paragraph>
        <Row style={{ display: 'flex', alignItems: 'baseline' }}>
          <div>
            <Form.Item name={['guildContribution', 'noContribution']} valuePropName="checked">
              <Checkbox disabled={locked}>No contribution</Checkbox>
            </Form.Item>
          </div>
          <div>
            <Form.Item name={['guildContribution', 'education']} valuePropName="checked">
              <Checkbox disabled={locked}>Education, presentations; topic(s)</Checkbox>
            </Form.Item>
          </div>
          <div>
            <Form.Item name={['guildContribution', 'internalProject']} valuePropName="checked">
              <Checkbox disabled={locked}>Contribution in an internal project</Checkbox>
            </Form.Item>
          </div>
          <div>
            <Form.Item name={['guildContribution', 'startup']} valuePropName="checked">
              <Checkbox disabled={locked}>New startup idea</Checkbox>
            </Form.Item>
          </div>
          <div style={{ paddingTop: 8, maxWidth: 300 }}>
            <Form.Item name={['guildContribution', 'custom']}>
              <Input placeholder={locked ? '' : 'Custom type'} disabled={locked} />
            </Form.Item>
          </div>
        </Row>
      </div>
      <Form.Item name="amountOfTime">
        <Title level={3}>Amount of time</Title>
        <Paragraph style={{ maxWidth: 550 }}>
          Define here a rough plan how you will use guild for a half of a year or for a full year.
          i.e. I will need 1 day per week to do guild work. Or I will need entire week to work on
          the project \ prepare exams. Discuss the plan and agree on it with your Agile Manager.
          Scrum Master and Agile Manager will help you to find good time slots from a project
          perspective and will also help to communicate it to our clients and colleagues.
        </Paragraph>
        <Input.TextArea
          rows={4}
          placeholder={locked ? '' : 'Describe time needed for guild projects'}
          onBlur={handleSubmit}
          disabled={locked}
        />
        ,
      </Form.Item>
    </Form>
  )
}

export default DevelopmentPlanForm
