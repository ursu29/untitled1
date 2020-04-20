import React, { PropsWithChildren, useState, useEffect, useContext } from 'react'

const EmployeeContext = React.createContext<any>(null)

function EmployeeProvider(props: { value: any } & PropsWithChildren<any>) {
  const [employee, setEmployee] = useState(props.value)
  const value = { employee, setEmployee }

  useEffect(() => {
    setEmployee(props.value)
    //eslint-disable-next-line
  }, [JSON.stringify(props.value)])

  return <EmployeeContext.Provider value={value}>{props.children}</EmployeeContext.Provider>
}

const EmployeeConsumer = EmployeeContext.Consumer

function useEmployee() {
  const { employee, setEmployee } = useContext(EmployeeContext)
  return { employee, setEmployee }
}

export { EmployeeContext, EmployeeProvider, EmployeeConsumer, useEmployee }
