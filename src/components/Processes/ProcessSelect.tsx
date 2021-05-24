import { useQuery } from '@apollo/client'
import React from 'react'
import { Select } from 'antd'
import { SelectProps } from 'antd/es/select'
import getProcesses, { QueryType } from '../../queries/getProcesses'

interface Props extends Exclude<SelectProps<any>, 'loading'> {}

function ProcessSelect(props: Props, ref: any) {
  const { data, loading } = useQuery<QueryType>(getProcesses)
  return (
    <Select {...props} loading={loading}>
      {data?.processes?.map(item => {
        return (
          <Select.Option key={item.id} value={item.id} title={item.type}>
            {item.title}
          </Select.Option>
        )
      })}
    </Select>
  )
}

export default React.forwardRef(ProcessSelect)
