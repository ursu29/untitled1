import React from 'react'
import { TreeSelect } from 'antd'

const buildTree = (items: Item[]) => {
  let hashTable = Object.create(null)
  items.forEach(aData => (hashTable[aData.key] = { ...aData, children: [] }))
  let dataTree: any = []
  items.forEach(aData => {
    if (aData.parentKey) hashTable[aData.parentKey].children.push(hashTable[aData.key])
    else dataTree.push(hashTable[aData.key])
  })
  return dataTree
}

interface Item {
  title: string
  value: string
  key: string
  parentKey?: string
}

interface Props {
  value?: string | string[]
  loading: boolean
  multiple: boolean
  items?: Item[]
  onChange: (value: string | string[]) => void
}

function PortalTreeSelect({ loading, value, multiple, items, onChange }: Props, ref: any) {
  if (!items) return null
  const tree = buildTree(items)
  return (
    <TreeSelect
      ref={ref}
      loading={loading}
      onChange={onChange}
      value={value}
      style={{ width: '100%' }}
      showCheckedStrategy="SHOW_ALL"
      treeCheckable
      dropdownStyle={{ maxHeight: 300, overflow: 'auto' }}
      multiple={multiple}
      treeData={tree}
    />
  )
}

function propsAreEqual(prevProps: Props, nextProps: Props) {
  return (
    prevProps.value?.toString() === nextProps.value?.toString() &&
    prevProps.loading === nextProps.loading &&
    prevProps.multiple === nextProps.multiple &&
    prevProps.multiple === nextProps.multiple &&
    prevProps.onChange === nextProps.onChange &&
    prevProps.items?.toString() === nextProps.items?.toString()
  )
}

export default React.memo(React.forwardRef(PortalTreeSelect), propsAreEqual)
