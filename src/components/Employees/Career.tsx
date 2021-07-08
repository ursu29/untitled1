import { Radio, Space } from 'antd'
import React from 'react'
import { Access, Employee } from '../../types/graphql'
import URLAction from '../../utils/URLAction'
import EmployeeEvaluation from '../EmployeeEvaluation/EmployeeEvaluation'
import EmployeeMatrices from '../EmployeeMatrices/EmployeeMatrices'
import { TabTitleWithBadge } from '../UI/TabTitleWithBadge'
import EmployeeCV from './EmployeeCV'
import EmployeeDevelopmentPlan from './EmployeeDevelopmentPlan'
import EmployeeSkills from './EmployeeSkills'
import EmployeeSubordinates from './EmployeeSubordinates'

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

  if (access?.matricesLookReviewersAccess?.read) {
    tabs.push({
      title: 'Matrices',
      key: 'matrices',
      body: (
        <EmployeeMatrices
          employee={employee}
          reviewersListAccess={access.matricesLookReviewersAccess}
        />
      ),
    })
  }
  if (access.evaluationReviewersAccess?.read) {
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

  if (access.developmentPlanLookReviewersAccess?.read) {
    tabs.push({
      title: 'Personal development',
      key: 'development-plan',
      body: (
        <EmployeeDevelopmentPlan
          employee={employee}
          reviewersListAccess={access.developmentPlanLookReviewersAccess}
        />
      ),
    })
  }

  if (employee?.subordinateUsersCount?.users) {
    tabs.push({
      title: (
        <TabTitleWithBadge
          title={`Total count: ${employee.subordinateUsersCount?.users} user(s)`}
          count={employee.subordinateUsersCount?.users}
          offset={[12, -6]}
          overflowCount={999}
          showZero
          style={{
            backgroundColor: '#fff',
            color: '#999',
            boxShadow: '0 0 0 1px #d9d9d9 inset',
          }}
        >
          <TabTitleWithBadge
            title={`One-2-one: ${employee.subordinateUsersCount?.one2oneRequests} request(s)`}
            count={employee.subordinateUsersCount?.one2oneRequests ? '1-2-1' : null}
            offset={[-25, -9]}
            size="small"
            style={{
              backgroundColor: '#ffc400',
              fontSize: '10px',
            }}
          >
            My employees
          </TabTitleWithBadge>
        </TabTitleWithBadge>
      ),
      key: 'employees',
      body: <EmployeeSubordinates employee={employee} />,
    })
  }

  if (access.curriculumVitaeAccess?.read) {
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
      <Space direction="vertical" size="middle">
        <Radio.Group
          value={activeTab}
          onChange={e => {
            urlAction.paramsSet('subtab', e.target.value)
            setActiveTab(e.target.value)
          }}
        >
          {tabs.map(tab => (
            <Radio.Button value={tab.key}>{tab.title}</Radio.Button>
          ))}
        </Radio.Group>
        <div>{tabs.find(i => i.key === activeTab)?.body}</div>
      </Space>
    </>
  )
}
