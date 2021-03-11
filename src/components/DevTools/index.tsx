import React from 'react'
import { Select, Space, Tooltip } from 'antd'
import styled from 'styled-components'
import { useEmployee } from '../../utils/withEmployee'
import { useGetDevtoolsQuery } from '../../queries/devtools'

const Wrapper = styled.div`
  position: fixed;
  right: 20px;
  bottom: 0;
  user-select: none;
  padding-bottom: 20px;
  filter: opacity(0.4);
  :hover {
    filter: opacity(1);
  }
`

const Title = styled.div`
  font-size: 10px;
  font-weight: bold;
  color: white;
  width: fit-content;
  user-select: none;
  padding: 1px 3px;
  background-color: #ffa828;
  border-radius: 5px;
`

const GitInfo = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
`

const Repo = styled.div`
  color: purple;
  font-size: 12px;
  font-weight: 400;
`

const Branch = styled.div`
  color: blue;
  font-size: 12px;
`

const Commit = styled.div`
  margin: -5px 0 -5px 10px;
  color: gray;
  font-size: 11px;
  cursor: pointer;
`

const { Option } = Select

export default function DevTools({ children }: any) {
  const user = useEmployee()

  // Get ClientDevToolsGitInfo
  const { data } = useGetDevtoolsQuery()

  // GATEWAY Git Info
  const gatewayGitInfo = data?.clientDevToolsGitInfo || {
    repoName: null,
    branchName: null,
    commitId: null,
    commitMsg: null,
  }
  const {
    repoName: repoNameGW,
    branchName: branchNameGW,
    commitId: commitIdGW,
    commitMsg: commitMsgGW,
  } = gatewayGitInfo

  // CLIENT Git Info
  const clientGitInfo = {
    repoName: process.env.REACT_APP_DT_REPO_NAME,
    branchName: process.env.REACT_APP_DT_BRANCH_NAME,
    commitId: process.env.REACT_APP_DT_SOURCE_VERSION,
    commitMsg: process.env.REACT_APP_DT_SOURCE_VERSION_MSG,
  }
  const { repoName, branchName, commitId, commitMsg } = clientGitInfo

  return (
    <>
      <Wrapper>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '-8px',
            marginLeft: '-10px',
          }}
        >
          <Title>DevTool</Title>
          <Select
            defaultValue={user.devOnlyUserRole}
            style={{
              width: 100,
              color: 'rgba(0, 128, 0, 0.82)',
              fontSize: '12px',
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
        </div>

        {!!Object.values(clientGitInfo).join('') && (
          <>
            <GitInfo>
              <Space>
                <Repo>{repoName}</Repo>
                {' - '}
                <Branch>{branchName}</Branch>
              </Space>
            </GitInfo>
            <GitInfo>
              <Commit>
                <Tooltip placement="left" title={commitMsg}>
                  {commitId?.slice(0, 8)}
                </Tooltip>
              </Commit>
            </GitInfo>
          </>
        )}

        {!!Object.values({
          repoNameGW,
          branchNameGW,
          commitIdGW,
          commitMsgGW,
        }).join('') && (
          <>
            <GitInfo>
              <Space>
                <Repo>{repoNameGW}</Repo>
                {' - '}
                <Branch>{branchNameGW}</Branch>
              </Space>
            </GitInfo>
            <GitInfo>
              <Commit>
                <Tooltip placement="left" title={commitMsgGW}>
                  {commitIdGW?.slice(0, 8)}
                </Tooltip>
              </Commit>
            </GitInfo>
          </>
        )}
      </Wrapper>
      {children}
    </>
  )
}
