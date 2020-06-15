import React, { useEffect } from 'react'
import { MatrixCell, EmptySlot as EmptySlotStyled } from '../../styled'

export default function EmptySlot({ keyProp }: { keyProp: string }) {
  useEffect(() => {
    // Disable react dnd DEV warnings cause Empty Slot intentionally does not have drag handle
    //@ts-ignore
    window['__react-beautiful-dnd-disable-dev-warnings'] = true
    return () => {
      //@ts-ignore
      window['__react-beautiful-dnd-disable-dev-warnings'] = false
    }
  }, [])

  return (
    <MatrixCell key={keyProp}>
      <EmptySlotStyled />
    </MatrixCell>
  )
}
