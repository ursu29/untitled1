import { Radio, Space } from 'antd'
import React from 'react'
import { Access, Employee } from '../../types/graphql'
import URLAction from '../../utils/URLAction'
import { useEmployee } from '../../utils/withEmployee'
import EmployeeEvaluation from '../EmployeeEvaluation/EmployeeEvaluation'
import EmployeeMatrices from '../EmployeeMatrices/EmployeeMatrices'
import EmployeeCV from './EmployeeCV'
import EmployeeDevelopmentPlan from './EmployeeDevelopmentPlan'
import EmployeeSkills from './EmployeeSkills'

interface Props {
  employee: Pick<
    Employee,
    'id' | 'email' | 'name' | 'access' | 'isMe' | 'subordinateUsersCount'
  > & {
    agileManager: Pick<Employee, 'id' | 'name' | 'isMe'>
  }
  access: {
    curriculumVitaeAccess: Access | undefined
    matricesLookReviewersAccess: Access | undefined
    developmentPlanLookReviewersAccess: Access | undefined
    evaluationReviewersAccess: Access | undefined
  }
}

const DEFAULT_TAB = 'skills'

export default function Career({ employee, access }: Props) {
  const user = useEmployee()
  const isAgileManager = user.employee.id === employee.agileManager.id
  console.log(isAgileManager)
  const urlAction = new URLAction()
  const [activeTab, setActiveTab] = React.useState(urlAction.paramsGet('subtab') ?? DEFAULT_TAB)
  const tabs: { title: string | JSX.Element; key: string; body: JSX.Element }[] = [
    {
      title: 'Skills',
      key: DEFAULT_TAB,
      body: (
        <EmployeeSkills
          employee={employee}
          editable={employee?.access?.write}
          showTabs={employee.isMe}
        />
      ),
    },
  ]

  if (access?.matricesLookReviewersAccess?.read || isAgileManager) {
    tabs.push({
      title: 'Matrices',
      key: 'matrices',
      body: (
        <EmployeeMatrices
          employee={employee}
          reviewersListAccess={access.matricesLookReviewersAccess || { read: true, write: false }}
        />
      ),
    })
  }
  if (access.evaluationReviewersAccess?.read || isAgileManager) {
    tabs.push({
      title: 'Self Evaluation',
      key: 'evaluation',
      body: (
        <EmployeeEvaluation
          employee={employee}
          editable={access.evaluationReviewersAccess?.write ?? false}
        />
      ),
    })
  }

  if (access.developmentPlanLookReviewersAccess?.read || isAgileManager) {
    tabs.push({
      title: 'Personal development',
      key: 'development-plan',
      body: (
        <EmployeeDevelopmentPlan
          employee={employee}
          reviewersListAccess={
            access.developmentPlanLookReviewersAccess || { read: true, write: false }
          }
        />
      ),
    })
  }

  if (access.curriculumVitaeAccess?.read || isAgileManager) {
    tabs.push({
      title: 'CV',
      key: 'cv',
      body: (
        <EmployeeCV
          editable={access.curriculumVitaeAccess?.write ?? false}
          employee={{
            id: employee?.id || '',
            email: employee?.email || '',
            name: employee?.name || '',
            isMe: employee?.isMe || false,
          }}
        />
      ),
    })
  }

  return (
    <>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Radio.Group
          value={activeTab}
          onChange={e => {
            urlAction.paramsSet('subtab', e.target.value)
            setActiveTab(e.target.value)
          }}
        >
          {tabs.map(tab => (
            <Radio.Button key={tab.key} value={tab.key}>
              {tab.title}
            </Radio.Button>
          ))}
        </Radio.Group>
        <div>{tabs.find(i => i.key === activeTab)?.body}</div>
      </Space>
    </>
  )
}
