import React, { useState } from 'react'
import { Select } from 'antd'
import styled from 'styled-components'
import { useEmployee } from '../../utils/withEmployee'

const Wrapper = styled.div`
  position: fixed;
  right: 20px;
  top: 20px;
  width: 165px;
  user-select: none;
`

const Title = styled.div<{ active: boolean }>`
  font-size: 11px;
  font-weight: bold;
  color: red;
  cursor: pointer;
  width: fit-content;
  user-select: none;
  filter: ${props => (props.active ? '' : 'opacity(0.4)')};
  :hover {
    filter: opacity(0.7);
  }
`

const ActiveForm = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid red;
  border-radius: 2px;
  padding: 10px;
  background-color: cornsilk;
  user-select: none;
  background-color: #87ded81c;
`

const NoActiveForm = styled.div`
  display: flex;
  padding: 0 5px;
  margin-top: -3px;
`

const TextLine = styled.div`
  color: rgba(0, 128, 0, 0.82);
  font-size: 18px;
  font-weight: 100;
  letter-spacing: -0.2px;
  background-color: #87ded81c;
`

const { Option } = Select

export default function DevTools({ children }: any) {
  const user = useEmployee()
  const [active, toggleActive] = useState(false)

  return (
    <>
      <Wrapper>
        <Title active={active} onClick={() => toggleActive(!active)}>
          DEV TOOLS
        </Title>
        {!active ? (
          <NoActiveForm>
            <TextLine>{user.devOnlyUserRole.toUpperCase()}</TextLine>
          </NoActiveForm>
        ) : (
          <ActiveForm>
            <span>Assign new role</span>
            <Select
              defaultValue={user.devOnlyUserRole}
              style={{
                width: 140,
                color: 'rgba(0, 128, 0, 0.82)',
                fontSize: '18px',
                fontWeight: 100,
                letterSpacing: '-0.2px',
              }}
              bordered={false}
              onChange={value => {
                user.setDevOnlyUserRole(value)
                localStorage.setItem('devOnlyUserRole', value)
                window.location.reload()
              }}
            >
              <Option value="off">OFF</Option>
              <Option value="user">USER</Option>
              <Option value="manager">MANAGER</Option>
              <Option value="superUser">SUPERUSER</Option>
            </Select>
          </ActiveForm>
        )}
      </Wrapper>
      {children}
    </>
  )
}
