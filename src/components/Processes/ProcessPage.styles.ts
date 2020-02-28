import styled from 'styled-components'

export const ColumnWrapper = styled.div`
  align-self: flex-start;
  display: inline-flex;
  flex-direction: column;
  position: relative;
  margin-top: 16px;
  /* margin-bottom: 16px; */
  &::before {
    content: '';
    z-index: 0;
    width: 1px;
    height: calc(100% - 32px);
    background: #eee;
    position: absolute;
    left: 32px;
    top: 0;
  }
  & + & {
    margin-left: 48px;
  }
`
export const RowWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  position: relative;
  &:before {
    content: '';
    z-index: 0;
    width: calc(100% - 32px);
    height: 1px;
    background: #eee;
    position: absolute;
    left: 16px;
    top: 21px;
  }
`
