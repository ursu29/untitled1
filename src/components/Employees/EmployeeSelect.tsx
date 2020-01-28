import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import getEmployees, { QueryType } from '../../queries/getEmployees'
import { Employee } from '../../types'
import Select from '../UI/Select'

type EmployeePick = Pick<Employee, 'id' | 'name'>

type Props = {
  value?: EmployeePick
  onChange?: (employee: string) => any
  onBlur?: any
  defaultOpen?: boolean
  autoFocus?: boolean
  allowAddNew?: boolean
  wide?: boolean
  size?: 'default' | 'small'
}

function EmployeeSelect({ onChange, value, wide, size, ...props }: Props, ref: any) {
  const { data, loading } = useQuery<QueryType>(getEmployees)
  const employee = data?.employees.find(i => i.id === String(value))
  return (
    <Select
      ref={ref}
      style={{ width: wide ? '100%' : 150 }}
      autoFocus={!loading && props.autoFocus}
      loading={loading}
      size={size}
      value={employee && { key: employee.name, value: employee.name }}
      onBlur={props.onBlur}
      onSelect={(value: { key: string }) => {
        const employee = data!.employees.find(employee => employee.name === value.key)
        if (employee) {
          onChange && onChange(employee.id)
        }
      }}
      items={data?.employees.map(employee => {
        return {
          id: employee.id,
          key: employee.name,
          value: employee.name,
        }
      })}
    />
  )
}

export default React.forwardRef(EmployeeSelect)
