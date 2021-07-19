import React, { useState, useEffect } from 'react'
import ReactVisibilitySensor from 'react-visibility-sensor'

type Props = React.PropsWithChildren<{
  checkVisibility?: boolean
  loadMore?: () => void
}>

const VisibilitySensor = ({ checkVisibility, loadMore, children }: Props) => {
  const [active, setActive] = useState(checkVisibility)

  useEffect(() => {
    // reset trigger
    setActive(checkVisibility)
  }, [checkVisibility])

  return (
    <ReactVisibilitySensor
      partialVisibility
      active={active}
      onChange={visible => {
        if (visible) {
          // trigger should be called only once
          setActive(false)
          loadMore?.()
        }
      }}
    >
      {children}
    </ReactVisibilitySensor>
  )
}

export default VisibilitySensor
