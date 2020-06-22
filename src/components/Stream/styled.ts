import styled from 'styled-components'

export const CardWrapper = styled.div<{ isSingleColumn: boolean }>`
  display: flex;
  flex-direction: ${props => (props.isSingleColumn ? 'column' : 'row')};
  margin-bottom: 17px;
`

export const PreviewBlock = styled.div<{ isSingleColumn: boolean }>`
  width: fit-content;
  cursor: pointer;
  margin-bottom: ${props => (props.isSingleColumn ? '10px' : 0)};
`

export const TitleBlock = styled.div<{ isNameShown: boolean; isSingleColumn: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: -4px;
  line-height: 21px;
  margin-left: ${props => (props.isSingleColumn ? '0' : '12px')};
  width: ${props => (props.isNameShown ? '60%' : props.isSingleColumn ? '100%' : '65%')};
  min-width: ${props => (props.isNameShown ? '60%' : props.isSingleColumn ? '100%' : '65%')};
`

export const AuthorBlock = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const Duration = styled.div`
  width: fit-content;
  text-align: end;
  margin: -25px 5px 5px 0;
  padding: 0 5px;
  color: whitesmoke;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 3px;
  font-size: 14px;
  user-select: none;
`

export const VideoName = styled.div`
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: fit-content;
  max-width: 100%;
  &:hover {
    text-decoration: underline;
  }
`

export const VideoDescription = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  user-select: none;
  color: gray;
`

export const AuthorName = styled.div`
  margin-left: 10px;
  color: gray;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
