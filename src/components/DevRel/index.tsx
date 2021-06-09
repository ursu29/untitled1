import React, { useState } from 'react'
import PageContent from '../UI/PageContent'
import { Tabs, Button } from 'antd'
import ArticlesTab from './ArticlesTab'
import OutsideEventsTab from './OutsideEventsTab'
import ProposedEventsTable from './ProposedEventsTable'
import { FireOutlined, FileTextOutlined } from '@ant-design/icons'
import useStrapiGroupCheck from '../../utils/useStrapiGroupCheck'
import PageHeader from '../UI/PageHeader'

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
    <>
      <PageHeader title="Development Relationship" withoutDivider />
      <PageContent style={{ paddingLeft: 0, paddingRight: 0, marginTop: '-32px' }}>
        <Tabs
          onTabClick={key => {
            setView(key)
          }}
          tabBarStyle={{ padding: '0 0 0 24px' }}
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
              <span data-cy="articles">
                <FileTextOutlined />
                Articles
              </span>
            }
            key="articles"
          />
        </Tabs>

        <div style={{ margin: '0 24px 16px' }}>
          {view === 'outside' && (
            <div
              style={{
                display: 'flex',
                justifyContent: writeAccess ? 'space-between' : 'flex-end',
              }}
            >
              {writeAccess && (
                <Button
                  data-cy="addNewEvent"
                  onClick={() => setModalOutsideEvent({ visible: true, modalMode: 'create' })}
                >
                  Add New
                </Button>
              )}
              <Button
                data-cy="proposeEvent"
                type="primary"
                onClick={() => setModalOutsideEvent({ visible: true, modalMode: 'propose' })}
              >
                Propose Event
              </Button>
            </div>
          )}
          {view === 'articles' && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                data-cy="addArticle"
                type="primary"
                onClick={() => setModalArticle({ visible: true })}
              >
                Propose Article
              </Button>
            </div>
          )}
        </div>

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

        {view === 'outside' && writeAccess && (
          <div style={{ marginTop: '32px' }}>
            <div style={{ fontSize: 16, fontWeight: 500, margin: '16px 24px' }}>
              Proposed events
            </div>
            <ProposedEventsTable />
          </div>
        )}
      </PageContent>
    </>
  )
}
