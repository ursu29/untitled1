import React, { PropsWithChildren, useState, useEffect, useContext } from 'react'

const EmployeeContext = React.createContext<any>(null)

function EmployeeProvider(props: { value: any } & PropsWithChildren<any>) {
  const [employee, setEmployee] = useState(props.value)
  const [devOnlyRole, setDevOnlyRole] = useState('user')

  const value = { employee, setEmployee, devOnlyRole, setDevOnlyRole }

  useEffect(() => {
    setEmployee(props.value)
    //eslint-disable-next-line
  }, [JSON.stringify(props.value)])

  return <EmployeeContext.Provider value={value}>{props.children}</EmployeeContext.Provider>
}

const EmployeeConsumer = EmployeeContext.Consumer

function useEmployee() {
  const { employee, setEmployee, devOnlyRole, setDevOnlyRole } = useContext(EmployeeContext)
  return { employee, setEmployee, devOnlyRole, setDevOnlyRole }
}

export { EmployeeContext, EmployeeProvider, EmployeeConsumer, useEmployee }
