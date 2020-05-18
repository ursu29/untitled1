import styled from 'styled-components'

export const ColumnWrapper = styled.div<{ hasNextSteps?: boolean; editable?: boolean }>`
  align-self: flex-start;
  display: inline-flex;
  flex-direction: column;
  position: relative;
  margin-top: 16px;
  /* margin-bottom: 16px; */
  /* &::before {
    display: ${(props) => {
      if (props.hasNextSteps === undefined) return 'block'
      return props.hasNextSteps ? 'block' : 'none'
    }};
    content: '';
    z-index: 0;
    width: 1px;
    height: calc(100% - 32px);
    background: #eee;
    position: absolute;
    left: 22px;
    top: 0;
  } */
  & + & {
    margin-left: ${(props) => (props.editable ? '48px' : '20px')};
  }
`
export const RowWrapper = styled.div<{ hasSeveralSteps?: boolean }>`
  display: inline-flex;
  flex-direction: row;
  position: relative;
  &:before {
    display: ${(props) => {
      if (props.hasSeveralSteps === undefined) return 'block'
      return props.hasSeveralSteps ? 'block' : 'none'
    }};
    content: '';
    z-index: 0;
    width: calc(100% - 32px);
    height: 1px;
    background: #eee;
    position: absolute;
    left: 16px;
    top: 24px;
  }
`

export const ProcessStepWrapper = styled.div<{ hasNextSteps?: boolean }>`
  &::before {
    display: ${(props) => {
      if (props.hasNextSteps === undefined) return 'block'
      return props.hasNextSteps ? 'block' : 'none'
    }};
    content: '';
    z-index: 0;
    width: 1px;
    height: 20px;
    background: #eee;
    position: absolute;
    left: 22px;
    top: 100%;
  }
`
