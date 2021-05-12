import { List } from 'antd'
import React from 'react'
import { SharedFileFragmentFragment } from '../../queries/getSharedFiles'
import { SkillLink } from '../Skills/SkillLink'
import { UpdateFileDetails } from './UpdateFileDetails'

const getFolderPath = (webUrl: string) => {
  return webUrl.slice(webUrl.indexOf('.com/') + '.com/'.length)
}

const BulletDivider = () => (
  <span style={{ color: '#4a4a4a', paddingLeft: 4, paddingRight: 4 }}>&nbsp;•&nbsp;</span>
)

interface Props {
  files: SharedFileFragmentFragment[]
  detailed?: boolean
}

export const FileList = ({ files, detailed }: Props) => (
  <List
    pagination={{
      pageSize: 25,
      hideOnSinglePage: true,
      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      onChange: () => {
        document.body.scrollTop = 0 // For Safari
        document.documentElement.scrollTop = 0
      },
    }}
    dataSource={files}
    renderItem={file => (
      <List.Item key={file.id}>
        <List.Item.Meta
          style={{ wordBreak: 'break-all' }}
          title={
            <>
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                {file.fileName}
              </a>
              <BulletDivider />
              <UpdateFileDetails file={file} />
            </>
          }
          description={
            detailed ? (
              <>
                <div>
                  <span>From </span>
                  {decodeURI(getFolderPath(file.url))}
                </div>
                <div>
                  <span>Created {file.createdBy && <span>by {file.createdBy.name} </span>}</span>
                  {file.createdAt}.
                </div>
                <div>Size: {((file.size || 0) / 1000).toFixed(0)} KB</div>
                <div>
                  {file.skills?.map(skill => (
                    <SkillLink key={skill.id} skill={skill} />
                  ))}
                </div>
              </>
            ) : (
              <>
                <div>
                  <span>{file.createdBy && <span>by {file.createdBy.name} </span>}</span>
                  {file.createdAt}
                </div>
                <div>
                  {
                    //@ts-ignore
                    (file.size / 1e5).toFixed(0) / 10
                  }{' '}
                  MB
                </div>
                <div>
                  {file.skills?.map(skill => (
                    <SkillLink key={skill.id} skill={skill} />
                  ))}
                </div>
              </>
            )
          }
        />
      </List.Item>
    )}
  />
)
