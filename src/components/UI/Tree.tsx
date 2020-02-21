import { Input, Skeleton, Tree } from 'antd'
import React from 'react'

const { TreeNode } = Tree
const { Search } = Input

interface Leaf {
  id: string
  title: string
  key: string
  children?: Item[]
}

interface Item {
  id: string
  title: string
  key: string
  parent?: string | null
}

interface Props {
  onDoubleClick: (item: Item) => void
  loading?: boolean
  items?: Item[]
  onDrop?: (id: Item['id'], parent?: Item['id']) => void
  controls: any
}

function treeify(list: Item[]): Leaf[] {
  const idAttr = 'id'
  const parentAttr = 'parent'
  const childrenAttr = 'children'

  var treeList: Leaf[] = []
  var lookup: any = {}
  list.forEach(function(obj: any) {
    lookup[obj[idAttr]] = obj
    obj[childrenAttr] = []
  })
  list.forEach(function(obj: any) {
    if (obj[parentAttr] != null) {
      lookup[obj[parentAttr]][childrenAttr].push(obj)
    } else {
      treeList.push(obj)
    }
  })
  return treeList
}

export default class SkillsTree extends React.Component<Props> {
  state = {
    expandedKeys: [],
    searchValue: '',
    autoExpandParent: true,
  }

  handleSearch = (e: any) => {
    const { value } = e.target
    const expandedKeys =
      (value &&
        this.props.items
          ?.filter(item => item.title?.toLowerCase()?.includes(value.toLowerCase()))
          .map(item => item.key)) ||
      []
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    })
  }

  handleExpand = (expandedKeys: any) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    })
  }

  getParentItems = (parent?: string | null): Item[] => {
    if (!parent) return []
    if (!this.props.items) return []
    const newItem = this.props.items.find(item => item.id === parent)
    if (newItem) {
      let childItems: Item[] = []
      if (newItem.parent) {
        childItems = this.getParentItems(newItem.parent)
      }
      return [newItem].concat(childItems)
    }
    return []
  }

  filterItems = (searchValue: string, items?: Item[]): Item[] => {
    if (!items) return []
    if (!searchValue) return items

    let result: Item[] = []
    const directFilter = items?.filter(item =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    )
    result = result.concat(directFilter)
    directFilter.forEach(item => {
      const parentItems = this.getParentItems(item.parent)
      parentItems.forEach(item => {
        if (!result.find(i => i.id === item.id)) {
          result.push(item)
        }
      })
    })
    return result
  }

  renderTreeNodes = (data: Leaf[]): React.ReactNode => {
    const { searchValue } = this.state
    return data.map(item => {
      if (item.children) {
        const handleDoubleClick = () => this.props.onDoubleClick(item)
        const index = item.title.toLowerCase().indexOf(searchValue.toLowerCase())
        const beforeStr = item.title.substring(0, index)
        const middleStr = item.title.substring(index, index + searchValue.length)
        const afterStr = item.title.substring(index + searchValue.length)
        const title =
          searchValue && index > -1 ? (
            <span
              style={{ display: 'flex', whiteSpace: 'pre-wrap' }}
              onDoubleClick={handleDoubleClick}
            >
              {beforeStr}
              <span style={{ color: '#f50' }}>{middleStr}</span>
              {afterStr}
            </span>
          ) : (
            <span style={{ display: 'flex' }} onDoubleClick={handleDoubleClick}>
              {item.title}
            </span>
          )
        return (
          <TreeNode title={title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode key={item.key} {...item} />
    })
  }

  handleDrop = (info: any) => {
    if (!this.props.onDrop) return
    const dragItem = info.dragNode.props.dataRef
    const dropItem = info.node.props.dataRef
    const isInside = info.dropToGap === false
    this.props.onDrop(dragItem.id, isInside ? dropItem.id : dropItem.parent)
  }

  render() {
    const { items, onDrop, controls } = this.props
    const { expandedKeys, autoExpandParent, searchValue } = this.state
    const filteredItems = this.filterItems(searchValue, items)
    return (
      <Skeleton loading={this.props.loading} active paragraph={{ rows: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <Search placeholder="Search" onChange={this.handleSearch} />
          {controls && <div style={{ marginLeft: 8 }}>{controls}</div>}
        </div>

        <Tree
          onExpand={this.handleExpand}
          expandedKeys={expandedKeys}
          autoExpandParent={autoExpandParent}
          draggable={Boolean(onDrop)}
          blockNode={Boolean(onDrop)}
          onDrop={this.handleDrop}
        >
          {this.renderTreeNodes(treeify(filteredItems))}
        </Tree>
      </Skeleton>
    )
  }
}
