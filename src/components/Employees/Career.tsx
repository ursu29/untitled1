import { Radio, Space } from 'antd'
import React, { useState } from 'react'
import { Access, Employee } from '../../types/graphql'
import URLAction from '../../utils/URLAction'
import EmployeeEvaluation from '../EmployeeEvaluation/EmployeeEvaluation'
import EmployeeMatrices from '../EmployeeMatrices/EmployeeMatrices'
import ExportMatrices from '../EmployeeMatrices/ExportMatrices'
import EmployeeCV from './EmployeeCV'
import EmployeeDevelopmentPlan from './EmployeeDevelopmentPlan'
import EmployeeSkills from './EmployeeSkills'
import EmployeeReviewers, { ReviewersNames } from '../Employees/EmployeeReviewers'

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

  const [exportMatrices, setExportMatrices] = useState([])

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
          reviewersListAccess={access.matricesLookReviewersAccess || { read: true, write: false }}
          setExportMatrices={setExportMatrices}
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
          reviewersListAccess={
            access.developmentPlanLookReviewersAccess || { read: true, write: false }
          }
        />
      ),
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
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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

        {activeTab === 'matrices' && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <EmployeeReviewers
              employee={employee}
              reviewersName={ReviewersNames.matricesReviewers}
              reviewersListAccess={
                access.matricesLookReviewersAccess || { read: true, write: false }
              }
            />
            <ExportMatrices matrices={exportMatrices} employee={employee} />
          </div>
        )}
      </div>
      <div>{tabs.find(i => i.key === activeTab)?.body}</div>
    </Space>
  )
}
