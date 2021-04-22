import { PlusCircleFilled } from '@ant-design/icons'
import { Typography } from 'antd'
import React, { useState } from 'react'
// import useStrapiGroupCheck from '../../utils/useStrapiGroupCheck'
import PageContent from '../UI/PageContent'
import Skeleton from '../UI/Skeleton'
import { AddBookModal } from './modal/CreateBookModal'
import { LibraryFilters } from './LibraryFilters'
import { LibraryList } from './LibraryList'
import { useLibraryApi } from './useLibraryApi'

export const LibraryPage = () => {
  const { data, dataLoading, dataUpdating } = useLibraryApi()
  const [filtered, setFiltered] = useState(data?.books)
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const canEdit = true // TODO useStrapiGroupCheck('HR_RU')

  return (
    <Skeleton active loading={dataLoading} withOffset>
      <PageContent noBottom>
        <Typography.Title>
          Library
          {canEdit && (
            <PlusCircleFilled
              style={{ color: '#1890FF', fontSize: 34, cursor: 'pointer', marginLeft: 20 }}
              onClick={() => setIsPopupVisible(true)}
            />
          )}
        </Typography.Title>
        <LibraryFilters books={data?.books} onFilterChange={setFiltered} />
      </PageContent>
      {data && (
        <LibraryList
          books={filtered}
          isFetching={dataUpdating}
          isAdmin={true} // TODO don't forget to change this
        />
      )}
      <AddBookModal
        onClose={() => setIsPopupVisible(false)}
        visible={isPopupVisible}
      ></AddBookModal>
    </Skeleton>
  )
}
