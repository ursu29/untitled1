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

type PropsGeneral = {
  editable: boolean
  employee: Pick<Employee, 'id' | 'email'>
}

const EmployeeCV = ({ employee, editable }: PropsGeneral) => {
  const { data: cvData, loading: cvLoading } = useGetCvQuery({
    variables: { email: employee.email },
  })
  const { data: experiencesData, loading: experiencesLoading } = useQuery<QueryType>(query, {
    variables: { input: { id: employee.id } },
  })
  const loading = cvLoading || experiencesLoading

  const cv = cvData?.employeeByEmail?.curriculumVitae
  const vitaes = cv?.vitaes || [] // full user's vitaes list
  const curriculumVitaeID = cv?.id || '' // list id
  const experiences = experiencesData?.employees?.[0].experiences
  const skills = experiences
    ?.filter(exp => [Level.Experienced, Level.Confident].includes(exp.level))
    .map(exp => exp.skill)
    .filter(skill => !skill.isMatrixOnly)

  return (
    <Skeleton loading={loading} active withOffset>
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
