import React, { PropsWithChildren, useState, useEffect, useContext } from 'react'
import { Profile } from '../types'

const EmployeeContext = React.createContext<any>(null)

function EmployeeProvider(props: { value: any } & PropsWithChildren<any>) {
  const [employee, setEmployee] = useState(props.value)
  const [devOnlyUserRole, setDevOnlyUserRole] = useState(
    localStorage.getItem('devOnlyUserRole') || 'off',
  )

  const value = { employee, setEmployee, devOnlyUserRole, setDevOnlyUserRole }

  useEffect(() => {
    setEmployee(props.value)
    //eslint-disable-next-line
  }, [JSON.stringify(props.value)])

  return <EmployeeContext.Provider value={value}>{props.children}</EmployeeContext.Provider>
}

const EmployeeConsumer = EmployeeContext.Consumer

function useEmployee(): {
  employee: Profile
  setEmployee: any
  devOnlyUserRole: string
  setDevOnlyUserRole: any
} {
  const { employee, setEmployee, devOnlyUserRole, setDevOnlyUserRole } = useContext(EmployeeContext)
  return { employee, setEmployee, devOnlyUserRole, setDevOnlyUserRole }
}

export { EmployeeContext, EmployeeProvider, EmployeeConsumer, useEmployee }
