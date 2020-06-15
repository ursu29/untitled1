import styled from 'styled-components'

export const MatrixCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 12px;
  min-height: 34px;
  min-width: 150px;
  color: rgba(0, 0, 0, 0.65);
  word-break: break-word;
  user-select: none;
`

export const MatrixRow = styled.div`
  display: flex;
`

export const MatrixGroup = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 20px;
  margin: 30px 20px 20px 0;
  color: rgba(0, 0, 0, 0.65);
`

export const MatrixGrade = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-right: 12px;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.45);
`

export const DragMarker = styled.div`
  display: flex;
  height: fit-content;
  background-color: #f7f7f7;
  margin-right: -5px;
  padding: 3px 9px 2px 3px;
  border: 1px solid #dcdcdc;
  border-right-width: 0;
  border-radius: 4px 0 0 4px;
`

export const EmptySlot = styled.div`
  height: 25px;
  width: 170px;
  border: 1px dashed lightgray;
  border-radius: 5px;
`
