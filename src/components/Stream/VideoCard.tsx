import React from 'react'
import { Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive'
import Metric from './Metric'
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
            marginBottom: '-86px',
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
                {METRICS.map((e: string) => (
                  <Metric key={e} name={e} number={(video as any)[e]} />
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
