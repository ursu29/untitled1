import React from 'react'
import { Employee } from '../../types'
import { useQuery, useMutation } from '@apollo/react-hooks'
import getEvaluations, { QueryType } from '../../queries/getEvaluations'
import EvaluationAttributes from './EvaluationAttributes'

interface Props {
  employee: Pick<Employee, 'id' | 'isMe'> & {
    manager: Pick<Employee, 'id' | 'name' | 'isMe'>
  }
}

function EmployeeEvaluation({ employee }: Props) {
  const { data, loading, error } = useQuery<QueryType>(getEvaluations, {
    variables: { input: { employee: employee.id } },
  })
  return (
    <EvaluationAttributes employee={employee} loading={loading} evaluations={data?.evaluations} />
  )
}

export default EmployeeEvaluation
