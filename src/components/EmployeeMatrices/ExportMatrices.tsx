import { useQuery } from '@apollo/client'
import React from 'react'
import { GATEWAY } from '../../config'
import getEmployeeExperiences, { QueryType } from '../../queries/getEmployeeExperiences'
import { Employee, Matrix } from '../../types'
import Button from '../UI/Button'

type Props = {
  matrices?: Exclude<Matrix, 'access'>[]
  employee?: Pick<Employee, 'id' | 'name'>
}

export default function ExportMatrices({ matrices, employee }: Props) {
  const { data, loading } = useQuery<QueryType>(getEmployeeExperiences, {
    variables: { input: { id: employee?.id } },
    skip: !employee,
  })
  if (!employee) return null
  const experiences = data?.employees[0]?.experiences
  const handleExport = () => {
    const url = `${GATEWAY}/export`
    import('file-saver').then(({ saveAs }) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          matrices,
          experiences,
        }),
      })
        .then(res => res.arrayBuffer())
        .then(data => {
          const blob = new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          })
          saveAs(blob, `matrices_${employee.name}_${new Date().toLocaleDateString()}.xlsx`)
        })
    })
  }
  return (
    <Button disabled={loading} onClick={handleExport}>
      Export
    </Button>
  )
}
