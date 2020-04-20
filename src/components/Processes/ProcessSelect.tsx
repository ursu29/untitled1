import React from 'react'
import { Select } from 'antd'
import { SelectProps } from 'antd/es/select'
import { useQuery } from '@apollo/react-hooks'
import getProcesses, { QueryType } from '../../queries/getProcesses'

interface Props extends Exclude<SelectProps, 'loading'> {}

function ProcessSelect(props: Props, ref: any) {
  const { data, loading } = useQuery<QueryType>(getProcesses)
  return (
    <Select {...props} loading={loading}>
      {data?.processes?.map((item) => {
        return (
          <Select.Option key={item.id} value={item.id} title={item.title}>
            {item.title}
          </Select.Option>
        )
      })}
    </Select>
  )
}

export default React.forwardRef(ProcessSelect)
