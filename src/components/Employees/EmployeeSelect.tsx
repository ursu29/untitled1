import { useQuery } from '@apollo/react-hooks'
import React from 'react'
import getEmployees, { QueryType } from '../../queries/getEmployees'
import { Employee } from '../../types'
import Select, { Props as SelectProps } from '../UI/Select'

type EmployeePick = Pick<Employee, 'id' | 'name'>

type Props = {
  value?: any
  onChange?: (employee: string | string[]) => any
  onBlur?: any
  defaultOpen?: boolean
  autoFocus?: boolean
  allowAddNew?: boolean
  wide?: boolean
  size?: 'default' | 'small'
  mode?: SelectProps['mode']
  keyName?: 'id' | 'email'
  style?: any
  loading?: boolean
  withoutMe?: boolean
}

function EmployeeSelect(
  {
    onChange,
    value,
    wide,
    size,
    mode,
    keyName: key = 'id',
    style,
    loading: parentLoading = false,
    withoutMe = false,
    ...props
  }: Props,
  ref: any,
) {
  const { data, loading } = useQuery<QueryType>(getEmployees)

  let employee = Array.isArray(value)
    ? data?.employees.filter((i) => value.includes(i[key]))
    : data?.employees.find((i) => i[key] === String(value))

  return (
    <Select
      ref={ref}
      style={{ width: wide ? '100%' : 150, ...style }}
      autoFocus={!loading && props.autoFocus}
      mode={mode}
      loading={loading || parentLoading}
      size={size}
      value={
        Array.isArray(employee)
          ? employee.map((i) => ({ key: i.name, value: i.name }))
          : employee
          ? { key: employee.name, value: employee.name }
          : undefined
      }
      onBlur={props.onBlur}
      onSelect={(value: any) => {
        if (!mode || mode === 'default') {
          const employee = data!.employees.find((employee) => employee.name === value.key)
          if (employee) {
            onChange && onChange(employee[key])
          }
        } else {
          const names = value.map((i: any) => i.key)
          const employees = data!.employees.filter((employee) => names.includes(employee.name))
          onChange && onChange(employees.map((i) => i[key]))
        }
      }}
      items={data?.employees
        .filter((i) => (withoutMe ? !i.isMe : true))
        .map((employee) => {
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
