import React from 'react'
import { useQuery } from '@apollo/react-hooks'
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
  const experiences = experiencesData?.employees?.[0].experiences
  const skills = experiences
    ?.filter(exp => [Level.Experienced, Level.Confident].includes(exp.level))
    .map(exp => exp.skill)
    .filter(skill => !skill.isMatrixOnly)

  const handleExport = () => {
    import('file-saver').then(({ saveAs }) => {
      fetch(`${GATEWAY}/export-cv`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cv,
          skills,
          employee: {
            name: employeeFull?.employeeByEmail?.name,
            position: employeeFull?.employeeByEmail?.position,
            location: employeeFull?.employeeByEmail?.location
              ? //@ts-expect-error
                getLocationName(employeeFull?.employeeByEmail?.location)
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
          <Button onClick={handleExport}>Export</Button>
        </div>
      )}
      <EmployeeCVSummary editable={editable} employee={employee} cv={cv} skills={skills} />
      <EmployeeCVExperience
        employee={employee}
        vitaes={vitaes}
        curriculumVitaeID={curriculumVitaeID}
        editable={editable}
      />
      <EmployeeCVCertificates editable={editable} employee={employee} cv={cv} />
      <EmployeeCVEducation editable={editable} employee={employee} cv={cv} />
    </Skeleton>
  )
}

export default EmployeeCV
