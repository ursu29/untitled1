import React from 'react'
import { Icon as LegacyIcon } from '@ant-design/compatible'
import { Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import EmployeeAvatar from '../Employees/EmployeeAvatar'
import Technologies from '../UI/Technologies'
import { Stream } from '../../types'
import { getEmployeeLink } from '../../paths'
import {
  CardWrapper,
  PreviewBlock,
  TitleBlock,
  AuthorBlock,
  Duration,
  VideoName,
  VideoDescription,
  IconWrapper,
  AuthorName,
} from './styled'
import { METRICS, videoDuration, uploadDate } from './utils'
import StreamIcon from '../../svg/microsoft-stream.png'

export default function VideoCard({
  video,
  onClick,
  update,
}: {
  video: Stream
  onClick: any
  update: any
}) {
  const isSkills4 = useMediaQuery({ minWidth: 1400 })
  const isSkills3 = useMediaQuery({ minWidth: 1000 })
  const isSkills2 = useMediaQuery({ minWidth: 700 })
  const isNameShown = useMediaQuery({ minWidth: 825 })
  const isAvaShown = useMediaQuery({ minWidth: 750 })
  const isSingleColumn = useMediaQuery({ maxWidth: 520 })

  return (
    <CardWrapper isSingleColumn={isSingleColumn}>
      <PreviewBlock isSingleColumn={isSingleColumn} onClick={onClick}>
        <img src={StreamIcon} alt="" style={{ width: '60px', marginLeft: '6px' }} />
        <div
          style={{
            position: 'absolute',
            marginTop: '42px',
            width: '118px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Duration>{videoDuration(video.duration)}</Duration>
        </div>
      </PreviewBlock>

      <TitleBlock isNameShown={isNameShown} isSingleColumn={isSingleColumn}>
        <div>
          <VideoName onClick={onClick}>{video.name}</VideoName>
          <div style={{ display: 'flex', flexDirection: isSingleColumn ? 'column' : 'row' }}>
            <a
              href={`https://web.microsoftstream.com/video/${video.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div style={{ display: 'flex', marginRight: '15px' }}>
                {METRICS.map((e: { [key: string]: string }) => (
                  <Tooltip
                    key={e.field}
                    title={(video as any)[e.field] + ' ' + e.field}
                    placement="bottom"
                  >
                    <IconWrapper>
                      <span style={{ fontSize: '13px' }}>{(video as any)[e.field]}</span>
                      <LegacyIcon type={e.icon} style={{ marginLeft: '5px' }} />
                    </IconWrapper>
                  </Tooltip>
                ))}
              </div>
            </a>
            <Tooltip title={`Published on ${uploadDate(video.publishedDate)}`} placement="bottom">
              <div style={{ userSelect: 'none' }}>{uploadDate(video.publishedDate)}</div>
            </Tooltip>
          </div>
          <VideoDescription>{video.description}</VideoDescription>
        </div>
        <div style={{ marginTop: '-2px' }}>
          <Technologies
            technologies={video.skills}
            amount={isSkills4 ? 4 : isSkills3 ? 3 : isSkills2 ? 2 : 1}
            editable
            singleRow
            emptyString="(no skills)"
            handleSave={(value: any) =>
              update({ variables: { input: { id: video.id, ...value } } })
            }
          />
        </div>
      </TitleBlock>

      <AuthorBlock>
        <Tooltip key={video.videoId} placement="top" title={`Uploaded by ${video.creatorName}`}>
          <Link
            to={getEmployeeLink(video.creatorMail)}
            style={{
              display: 'flex',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {isAvaShown && (
              <div>
                <EmployeeAvatar
                  key={video.videoId}
                  email={video.creatorMail}
                  size="small"
                  loadImmediately
                />
              </div>
            )}
            {isNameShown && <AuthorName>{video.creatorName}</AuthorName>}
          </Link>
        </Tooltip>
      </AuthorBlock>
    </CardWrapper>
  )
}
