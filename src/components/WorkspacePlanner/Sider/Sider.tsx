import React from 'react'
import styled from 'styled-components'
import { LeftOutlined } from '@ant-design/icons'

const TableWrapper = styled.div`
  display: flex;
  max-height: 101%;
  position: absolute;
  top: 0;
  right: 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`

const ExpandIconWrapper = styled.div<{ isOpen: boolean }>`
  position: absolute;
  left: -29px;
  height: fit-content;
  font-size: 17px;
  color: white;
  padding: 5px 5px 5px 7px;
  margin: 10px 0;
  background-color: #1890ff;
  border-radius: 20px 0 0 20px;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`

const InnerWrapper = styled.div<{ isOpen: boolean }>`
  width: ${props => (props.isOpen ? '380px' : 0)};
  transition: 0.5s all;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 700px;
  border: solid #1890ff;
  border-width: ${props => (props.isOpen ? '0 0 1px 1px' : '0')};
  background-color: #ffffff;
  transition: all 0.4s ease 0s;
  cursor: pointer;
`

interface Props {
  isOpen: boolean
  onOpen: any
  children: any
}

export default function Sider({ isOpen, onOpen, children }: Props) {
  return (
    <TableWrapper>
      <ExpandIconWrapper isOpen={isOpen} onClick={() => onOpen(!isOpen)}>
        <div
          style={{
            transform: `rotateY(${isOpen ? '180deg' : 0})`,
            transition: '1s all',
          }}
        >
          <LeftOutlined />
        </div>
      </ExpandIconWrapper>
      <InnerWrapper isOpen={isOpen}>{children}</InnerWrapper>
    </TableWrapper>
  )
}
