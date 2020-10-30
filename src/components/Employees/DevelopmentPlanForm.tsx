import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Checkbox, Col, Input, Row, Typography } from 'antd'
import { FormComponentProps } from '@ant-design/compatible/lib/form/Form'
import React, { useEffect } from 'react'
import { DevelopmentPlan } from '../../types'
import DevelopmentGoals from './DevelopmentGoals'
import './styles.css'

const { Title, Paragraph } = Typography

type PlanPick = Exclude<DevelopmentPlan, 'employee'>

interface Props extends FormComponentProps {
  value?: PlanPick
  onChange: (value: PlanPick) => void
  locked?: boolean
  resetFields?: boolean
}

function DevelopmentPlanForm({ value, onChange, form, locked, resetFields }: Props) {
  useEffect(() => {
    form.resetFields()
    // eslint-disable-next-line
  }, [resetFields])

  const { getFieldDecorator } = form
  const handleSubmit = () => {
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onChange({
          id: value?.id,
          ...values,
          actualGoals: values.actualGoals?.map(({ __typename, ...i }: any) => i),
          previousGoals: values.previousGoals?.map(({ __typename, ...i }: any) => i),
        })
      }
    })
  }

  return (
    <Form
      layout="vertical"
      onChange={e => {
        e.preventDefault()
        handleSubmit()
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
            <Form.Item label="Positive">
              {getFieldDecorator('lookBackPositive', {
                initialValue: value?.lookBackPositive,
              })(<Input.TextArea rows={4} onBlur={handleSubmit} disabled={locked} />)}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Negative">
              {getFieldDecorator('lookBackNegative', {
                initialValue: value?.lookBackNegative,
              })(<Input.TextArea rows={4} onBlur={handleSubmit} disabled={locked} />)}
            </Form.Item>
          </Col>
        </Row>
      </div>
      <Form.Item>
        <Title level={3}>Look Forward</Title>
        <Paragraph style={{ maxWidth: 550 }}>
          Capture interest in the project and how the future is perceived from a project point of
          view. I.e. would the employee like to stay in the project, is happy with current position
          in the project, would like to change project, etc
        </Paragraph>
        {getFieldDecorator('lookForward', {
          initialValue: value?.lookForward,
        })(<Input.TextArea rows={4} onBlur={handleSubmit} disabled={locked} />)}
      </Form.Item>
      <Form.Item>
        <Title level={3}>Previous Goals</Title>
        <Paragraph style={{ maxWidth: 550 }}>
          Please copy here a list of goals from previous period. List includes goals from regular
          Performance development and from the Guild contribution. Report have you achieved success
          criteria for this goal. Put mark if goal was reached or not. 0=Didn’t reach (explain why
          in comments) 1=Goal was reached (in case there are some exceeded expectations achievements
          please put them in comments) N/A=Goal was postponed/dropped by legitimate reasons
        </Paragraph>
        {getFieldDecorator('previousGoals', {
          initialValue: value?.previousGoals,
        })(
          <DevelopmentGoals
            showAchievedSwitch
            onChange={values => {
              form.setFieldsValue({
                previousGoals: values,
              })
              handleSubmit()
            }}
            disabled={locked || false}
          />,
        )}
      </Form.Item>
      <div style={{ marginBottom: 16 }}>
        <Title level={3}>Personal Development</Title>
        <Paragraph style={{ maxWidth: 550 }}>
          Below there is a list of roles in three main categories: technical, business analysis and
          agile coaching/leading skills. Please note it is fine to not define any goals if the
          employee is happy where he is and wants to keep as is state.
        </Paragraph>
        <Title level={4}>Technical</Title>
        <Row gutter={16}>
          <Col span={7}>
            <div>
              {getFieldDecorator('developmentRoles.solutionArchitect', {
                valuePropName: 'checked',
                initialValue: value?.developmentRoles?.solutionArchitect,
              })(<Checkbox disabled={locked}>Solution Architect (UI and/or Backend)</Checkbox>)}
            </div>
            <div>
              {getFieldDecorator('developmentRoles.webDeveloper', {
                valuePropName: 'checked',
                initialValue: value?.developmentRoles?.webDeveloper,
              })(<Checkbox disabled={locked}>Web/UI Developer</Checkbox>)}
            </div>
            <div>
              {getFieldDecorator('developmentRoles.javaDeveloper', {
                valuePropName: 'checked',
                initialValue: value?.developmentRoles?.javaDeveloper,
              })(<Checkbox disabled={locked}>Java Developer</Checkbox>)}
            </div>
            <div>
              {getFieldDecorator('developmentRoles.dotnetDeveloper', {
                valuePropName: 'checked',
                initialValue: value?.developmentRoles?.dotnetDeveloper,
              })(<Checkbox disabled={locked}>.NET Developer (C#)</Checkbox>)}
            </div>
            <div>
              {getFieldDecorator('developmentRoles.uxExpert', {
                valuePropName: 'checked',
                initialValue: value?.developmentRoles?.uxExpert,
              })(<Checkbox disabled={locked}>UI/UX Expert</Checkbox>)}
            </div>
          </Col>
          <Col span={7}>
            <div>
              {getFieldDecorator('developmentRoles.devOps', {
                valuePropName: 'checked',
                initialValue: value?.developmentRoles?.devOps,
              })(<Checkbox disabled={locked}>DevOps</Checkbox>)}
            </div>
            <div>
              {getFieldDecorator('developmentRoles.infrastructureArchitect', {
                valuePropName: 'checked',
                initialValue: value?.developmentRoles?.infrastructureArchitect,
              })(<Checkbox disabled={locked}>Infrastructure Architect</Checkbox>)}
            </div>
            <div>
              {getFieldDecorator('developmentRoles.manualQA', {
                valuePropName: 'checked',
                initialValue: value?.developmentRoles?.manualQA,
              })(<Checkbox disabled={locked}>Manual QA</Checkbox>)}
            </div>
            <div>
              {getFieldDecorator('developmentRoles.automationQA', {
                valuePropName: 'checked',
                initialValue: value?.developmentRoles?.automationQA,
              })(<Checkbox disabled={locked}>Automation QA</Checkbox>)}
            </div>
          </Col>
        </Row>
      </div>
      <div style={{ marginBottom: 16 }}>
        <Title level={4}>Agile Coaching / Leading skills</Title>
        <Row>
          <div>
            {getFieldDecorator('developmentRoles.scrumMaster', {
              valuePropName: 'checked',
              initialValue: value?.developmentRoles?.scrumMaster,
            })(<Checkbox disabled={locked}>Scrum Master</Checkbox>)}
          </div>
          <div>
            {getFieldDecorator('developmentRoles.teamLead', {
              valuePropName: 'checked',
              initialValue: value?.developmentRoles?.teamLead,
            })(<Checkbox disabled={locked}>Team Lead</Checkbox>)}
          </div>
          <div>
            {getFieldDecorator('developmentRoles.agileCoach', {
              valuePropName: 'checked',
              initialValue: value?.developmentRoles?.agileCoach,
            })(<Checkbox disabled={locked}>Agile Coach</Checkbox>)}
          </div>
          <div>
            {getFieldDecorator('developmentRoles.agileManager', {
              valuePropName: 'checked',
              initialValue: value?.developmentRoles?.agileCoach,
            })(<Checkbox disabled={locked}>Agile Manager</Checkbox>)}
          </div>
        </Row>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Title level={4}>Business Analysis</Title>
        <Row>
          <div>
            {getFieldDecorator('developmentRoles.mathematician', {
              valuePropName: 'checked',
              initialValue: value?.developmentRoles?.mathematician,
            })(<Checkbox disabled={locked}>Mathematician / Quant</Checkbox>)}
          </div>
          <div>
            {getFieldDecorator('developmentRoles.actuarialBusinessAnalyst', {
              valuePropName: 'checked',
              initialValue: value?.developmentRoles?.actuarialBusinessAnalyst,
            })(<Checkbox disabled={locked}>Actuarial Business Analyst</Checkbox>)}
          </div>
          <div>
            {getFieldDecorator('developmentRoles.productOwner', {
              valuePropName: 'checked',
              initialValue: value?.developmentRoles?.productOwner,
            })(<Checkbox disabled={locked}>Product Owner</Checkbox>)}
          </div>
          <div>
            {getFieldDecorator('developmentRoles.dataAnalyst', {
              valuePropName: 'checked',
              initialValue: value?.developmentRoles?.dataAnalyst,
            })(<Checkbox disabled={locked}>Data Analyst</Checkbox>)}
          </div>
        </Row>
      </div>
      <Form.Item>
        <Title level={3}>Long Term goals (more than a year)</Title>
        <Paragraph style={{ maxWidth: 550 }}>
          Capture what long term goals the employee has in this regards. As an example “I want to
          become Senior Property Insurance Business Analyst in 2 years” would look fine in this
          section, but format is not strict
        </Paragraph>
        {getFieldDecorator('longTermGoals', {
          initialValue: value?.longTermGoals,
        })(
          <Input.TextArea
            rows={4}
            placeholder={locked ? '' : 'Describe new goal'}
            onBlur={handleSubmit}
            disabled={locked}
          />,
        )}
      </Form.Item>
      <Form.Item>
        <Title level={3}>Short Term goals (nearest 6 months, i.e. up to the next assessment)</Title>
        <Paragraph style={{ maxWidth: 550 }}>
          Capture what goals employee has for nearest year and what actions are required to reach
          the goal, maybe some intermediary steps are required. Goals should be clearly specified,
          should be realistic, should have clear timeframe, should have objective Success criteria.
          Capture also how guild activities could help to reach the goal.) Please add in comments if
          you plan to spend Guild time to achieve this goal and if possible, how much time do you
          plan to spend.
        </Paragraph>
        {getFieldDecorator('actualGoals', {
          initialValue: value?.actualGoals,
        })(
          <DevelopmentGoals
            showAchievedSwitch={false}
            onChange={values => {
              form.setFieldsValue({
                actualGoals: values,
              })
              handleSubmit()
            }}
            disabled={locked || false}
          />,
        )}
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
            {getFieldDecorator('guildContribution.noContribution', {
              valuePropName: 'checked',
              initialValue: value?.guildContribution?.noContribution,
            })(<Checkbox disabled={locked}>No contribution</Checkbox>)}
          </div>
          <div>
            {getFieldDecorator('guildContribution.education', {
              valuePropName: 'checked',
              initialValue: value?.guildContribution?.education,
            })(<Checkbox disabled={locked}>Education, presentations; topic(s)</Checkbox>)}
          </div>
          <div>
            {getFieldDecorator('guildContribution.internalProject', {
              valuePropName: 'checked',
              initialValue: value?.guildContribution?.internalProject,
            })(<Checkbox disabled={locked}>Contribution in an internal project</Checkbox>)}
          </div>
          <div>
            {getFieldDecorator('guildContribution.startup', {
              valuePropName: 'checked',
              initialValue: value?.guildContribution?.startup,
            })(<Checkbox disabled={locked}>New startup idea</Checkbox>)}
          </div>
          <div style={{ paddingTop: 8, maxWidth: 300 }}>
            {getFieldDecorator('guildContribution.custom', {
              initialValue: value?.guildContribution?.custom,
            })(<Input placeholder={locked ? '' : 'Custom type'} disabled={locked}></Input>)}
          </div>
        </Row>
      </div>
      <Form.Item>
        <Title level={3}>Amount of time</Title>
        <Paragraph style={{ maxWidth: 550 }}>
          Define here a rough plan how you will use guild for a half of a year or for a full year.
          i.e. I will need 1 day per week to do guild work. Or I will need entire week to work on
          the project \ prepare exams. Discuss the plan and agree on it with your Agile Manager.
          Scrum Master and Agile Manager will help you to find good time slots from a project
          perspective and will also help to communicate it to our clients and colleagues.
        </Paragraph>
        {getFieldDecorator('amountOfTime', {
          initialValue: value?.amountOfTime,
        })(
          <Input.TextArea
            rows={4}
            placeholder={locked ? '' : 'Describe time needed for guild projects'}
            onBlur={handleSubmit}
            disabled={locked}
          />,
        )}
      </Form.Item>
    </Form>
  )
}

export default Form.create<Props>({ name: 'development_plan_form' })(DevelopmentPlanForm)
