import React, { useState } from 'react'
import PageContent from '../UI/PageContent'
import { Tabs, Typography, Button } from 'antd'
import ArticlesTab from './ArticlesTab'
import OutsideEventsTab from './OutsideEventsTab'
import { FireOutlined, FileTextOutlined } from '@ant-design/icons'
import useStrapiGroupCheck from '../../utils/useStrapiGroupCheck'

export default function DevRel() {
  const writeAccess = useStrapiGroupCheck('DEVREL')
  const [view, setView] = useState('outside')
  const [modalOutsideEvent, setModalOutsideEvent] = useState<{
    visible: boolean
    modalMode?: 'propose' | 'create'
  }>({ visible: false })
  const [modalArticle, setModalArticle] = useState<{
    visible: boolean
  }>({ visible: false })

  return (
    <PageContent
      error={false}
      loading={false}
      notFound={false}
      notFoundMessage="Sorry, onboarding tickets were not found"
      style={{ paddingLeft: 0, paddingRight: 0 }}
    >
      <Typography.Title
        style={{
          fontSize: '20px',
          paddingLeft: '60px',
        }}
      >
        Development Relationship
      </Typography.Title>
      <Tabs
        onTabClick={key => {
          setView(key)
        }}
        tabBarStyle={{ padding: '0 60px' }}
      >
        <Tabs.TabPane
          tab={
            <span>
              <FireOutlined />
              Outside events
            </span>
          }
          key="outside"
        />
        <Tabs.TabPane
          tab={
            <span>
              <FileTextOutlined />
              Articles
            </span>
          }
          key="articles"
        />
      </Tabs>

      {view === 'outside' && (
        <OutsideEventsTab
          isModalVisible={modalOutsideEvent.visible}
          modalMode={modalOutsideEvent.modalMode}
          handleModalClose={() => setModalOutsideEvent({ visible: false })}
          writeAccess={writeAccess}
        />
      )}

      {view === 'articles' && (
        <ArticlesTab
          isModalVisible={modalArticle.visible}
          handleModalClose={() => setModalArticle({ visible: false })}
          handleModalOpen={() => setModalArticle({ visible: true })}
          writeAccess={writeAccess}
        />
      )}

      <div style={{ marginTop: '24px', marginLeft: '60px' }}>
        {view === 'outside' && (
          <div>
            <Button
              style={{ marginRight: '24px' }}
              onClick={() => setModalOutsideEvent({ visible: true, modalMode: 'propose' })}
            >
              Propose Event +
            </Button>
            {writeAccess && (
              <Button onClick={() => setModalOutsideEvent({ visible: true, modalMode: 'create' })}>
                Add New
              </Button>
            )}
          </div>
        )}
        {view === 'articles' && (
          <div>
            <Button onClick={() => setModalArticle({ visible: true })}>Propose Article +</Button>
          </div>
        )}
      </div>
    </PageContent>
  )
}
