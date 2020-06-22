import React, { useState } from 'react'
import { Modal } from 'antd'
import VideoCard from './VideoCard'
import { Stream } from '../../types'

interface Props {
  videos: Stream[]
  update: any
}

export default function VideoRows({ videos, update }: Props) {
  const [modalFrame, setModalFrame] = useState({
    isVisible: false,
    videoId: '',
    name: '',
  })

  if (!videos.length)
    return (
      <div style={{ color: '#909090' }}>
        <div style={{ fontSize: '16px', lineHeight: '30px', fontWeight: 500 }}>Nothing Found</div>
        <div>Sorry, no videos matched your criteria.</div>
      </div>
    )

  const modalTitle = React.createElement('div', { style: { width: '97%' } }, modalFrame.name)

  return (
    <div>
      {videos.map((video: any) => (
        <VideoCard
          key={video.videoId}
          video={video}
          update={update}
          onClick={() =>
            setModalFrame({
              isVisible: true,
              videoId: video.videoId,
              name: video.name,
            })
          }
        />
      ))}

      <Modal
        title={modalTitle}
        centered
        visible={modalFrame.isVisible}
        onCancel={() => setModalFrame({ isVisible: false, videoId: '', name: '' })}
        footer={null}
        width="100%"
        style={{ maxWidth: '901px' }}
      >
        <div style={{ maxWidth: '853px' }}>
          <div
            style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}
          >
            <iframe
              title="streamVideo"
              width="853"
              height="480"
              src={`https://web.microsoftstream.com/embed/video/${modalFrame.videoId}?autoplay=false&showinfo=false&preload=none`}
              //@ts-ignore
              allowfullscreen="true"
              style={{
                border: 'none',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                height: '100%',
                maxWidth: '100%',
              }}
            ></iframe>
          </div>
        </div>
      </Modal>
    </div>
  )
}
