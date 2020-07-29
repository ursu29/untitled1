import React, { useState } from 'react'
import { Select } from 'antd'
import styled from 'styled-components'
import { useEmployee } from '../../utils/withEmployee'

const Wrapper = styled.div`
  position: fixed;
  right: 20px;
  top: 20px;
`

const Title = styled.div<{ visible: boolean }>`
  font-size: 11px;
  font-weight: bold;
  color: red;
  cursor: pointer;
  width: fit-content;
  filter: ${props => (props.visible ? '' : 'opacity(0.4) drop-shadow(2px 4px 6px black)')};
`

const Content = styled.div<{ visible: boolean }>`
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  height: 100%;
  border: 1px solid red;
  border-radius: 2px;
  padding: 10px;
  background-color: cornsilk;
`

const { Option } = Select

export default function DevRoleSelector() {
  const user = useEmployee()
  const [visible, toggleVisible] = useState(false)

  return (
    <Wrapper>
      <Title visible={visible} onClick={() => toggleVisible(!visible)}>
        DEV TOOLS
      </Title>
      <Content visible={visible} style={{ display: 'flex', flexDirection: 'column' }}>
        <span>Select your role</span>
        <Select
          defaultValue="user"
          style={{ width: 120 }}
          onChange={value => {
            user.setDevOnlyRole(value)
          }}
        >
          <Option value="user">user</Option>
          <Option value="manager">manager</Option>
          <Option value="superUser">super user</Option>
        </Select>
      </Content>
    </Wrapper>
  )
}
