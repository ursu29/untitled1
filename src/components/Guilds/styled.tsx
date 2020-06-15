import styled from 'styled-components'

export const MainContent = styled.div<{ singleColumn: boolean }>`
  display: flex;
  justify-content: space-between;
  flex-direction: ${props => (props.singleColumn ? 'column-reverse' : 'row')};
`
export const LeftBlock = styled.div<{ singleColumn: boolean }>`
  width: ${props => (props.singleColumn ? '' : '70%')};
  margin-right: ${props => (props.singleColumn ? '' : '50px')};
`

export const RightBlock = styled.div<{ singleColumn: boolean }>`
  margin-top: ${props => (props.singleColumn ? '-10px' : '-50px')};
  margin-bottom: ${props => (props.singleColumn ? '30px' : '')};
  min-width: ${props => (props.singleColumn ? '' : '250px')};
  max-width: fit-content;
`

export const CardWrapper = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.09);
  border-radius: 2px;
  padding: 20px;
  margin-right: ${props => props.style?.marginRight || ''};
  margin-left: ${props => props.style?.marginLeft || ''};
`

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const GuildTitle = styled.div`
  cursor: pointer;
  font-size: 24px;
  color: black;
  &:hover {
    color: #1890ff;
  }
`
