import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import getEvaluations, { QueryType } from '../../queries/getEvaluations'
import { Employee } from '../../types'
import EvaluationAttributes from './EvaluationAttributes'

interface Props {
  employee?: Pick<Employee, 'id' | 'name' | 'isMe'> & {
    manager: Pick<Employee, 'id' | 'name' | 'isMe'>
  }
  editable: boolean
}

function EmployeeEvaluation({ employee, editable }: Props) {
  const { data, loading } = useQuery<QueryType>(getEvaluations, {
    variables: { input: { employee: employee?.id } },
    skip: !employee,
  })

  if (!employee) return null

  return (
    <EvaluationAttributes
      editable={editable}
      employee={employee}
      loading={loading}
      evaluations={data?.evaluations}
    />
  )
}

export default EmployeeEvaluation
