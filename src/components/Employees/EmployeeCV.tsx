import { useQuery } from '@apollo/client'
import { Row, Col, Divider } from 'antd'
import React from 'react'
import { Employee, Level } from '../../types/graphql'
import { useGetCvQuery } from '../../queries/cv'
import Skeleton from '../UI/Skeleton'
import EmployeeCVExperience from './EmployeeCVExperience'
import EmployeeCVSummary from './EmployeeCVSummary'
import query, { QueryType } from '../../queries/getEmployeeExperiences'
import EmployeeCVCertificates from './EmployeeCVCertificates'
import EmployeeCVEducation from './EmployeeCVEducation'
import Button from '../UI/Button'
import { GATEWAY } from '../../config'
import { useGetEmployeeQuery } from '../../queries/employees'
import getLocationName from '../../utils/getLocationName'
import EmployeeCVSkills from './EmployeeCVSkills'
import EmployeeCVLanguages from './EmployeeCVLanguages'
import './employee-cv.css'

// const levelSorting = [Level.Confident, Level.Experienced, Level.Learning, Level.Wanted]

type PropsGeneral = {
  editable: boolean
  employee: Pick<Employee, 'id' | 'email' | 'isMe' | 'name'>
}

const EmployeeCV = ({ employee, editable }: PropsGeneral) => {
  const { data: cvData, loading: cvLoading } = useGetCvQuery({
    variables: { email: employee.email },
  })
  const { data: experiencesData, loading: experiencesLoading } = useQuery<QueryType>(query, {
    variables: { input: { id: employee.id } },
  })
  const { data: employeeFull } = useGetEmployeeQuery({ variables: { email: employee.email } })

  const loading = cvLoading || experiencesLoading
  const cv = cvData?.employeeByEmail?.curriculumVitae
  const vitaes = cv?.vitaes || [] // full user's vitaes list
  const curriculumVitaeID = cv?.id || '' // list id
  const experiencesExperienced = experiencesData?.employees?.[0]?.experiences
    ?.filter(exp => !exp.skill.isMatrixOnly && Level.Experienced === exp.level)
    .sort((a, b) => a.skill.name.localeCompare(b.skill.name))
  const experiencesConfident = experiencesData?.employees?.[0]?.experiences
    ?.filter(exp => !exp.skill.isMatrixOnly && Level.Confident === exp.level)
    .sort((a, b) => a.skill.name.localeCompare(b.skill.name))

  const experiences = (experiencesConfident || []).concat(experiencesExperienced || [])

  const handleExport = () => {
    import('file-saver').then(({ saveAs }) => {
      fetch(`${GATEWAY}/export-cv`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cv,
          skills: experiences?.map(exp => exp.skill),
          employee: {
            name: employeeFull?.employeeByEmail?.name,
            position: employeeFull?.employeeByEmail?.position,
            location: employeeFull?.employeeByEmail?.location
              ? getLocationName(employeeFull?.employeeByEmail?.location)
              : '',
          },
        }),
      })
        .then(res => res.arrayBuffer())
        .then(data => {
          const blob = new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          })
          saveAs(blob, `CV_${employee?.name}_${new Date().toLocaleDateString()}.docx`)
        })
    })
  }

  return (
    <Skeleton loading={loading} active withOffset>
      {(editable || employee?.isMe) && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="primary" onClick={handleExport}>
            Export
          </Button>
        </div>
      )}
      <Row gutter={16}>
        <Col sm={7} style={{ paddingRight: 0 }}>
          <EmployeeCVSkills experiences={experiences} />
          <EmployeeCVLanguages editable={editable} employee={employee} cv={cv} />
        </Col>
        <Col sm={1} style={{ padding: 0, maxWidth: '32px' }}>
          <Divider
            type="vertical"
            style={{
              width: '1px',
              height: '100%',
              margin: '0 16px',
              padding: 0,
            }}
          />
        </Col>
        <Col sm={16} style={{ paddingLeft: 0 }}>
          <EmployeeCVSummary editable={editable} employee={employee} cv={cv} />
          <EmployeeCVExperience
            employee={employee}
            vitaes={vitaes}
            curriculumVitaeID={curriculumVitaeID}
            editable={editable}
          />
        </Col>
        <Col sm={24} style={{ marginTop: 32 }}>
          <EmployeeCVCertificates editable={editable} employee={employee} cv={cv} />
          <EmployeeCVEducation editable={editable} employee={employee} cv={cv} />
        </Col>
      </Row>
    </Skeleton>
  )
}

export default EmployeeCV
