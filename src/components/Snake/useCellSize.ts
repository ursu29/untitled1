import { useRef, useState, useEffect } from 'react'
import { debounce } from 'throttle-debounce'
import { SCREEN_CELL_X_COUNT, SCREEN_CELL_Y_COUNT } from './utils'

export const useCellSize = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [cellSize, setCellSize] = useState<number>(0)

  useEffect(() => {
    const updateCellSize = debounce(100, () => {
      const element = ref.current
      if (element) {
        const xCellSize = Math.max(1, element.offsetWidth / SCREEN_CELL_X_COUNT)
        const yCellSize = Math.max(1, element.offsetHeight / SCREEN_CELL_Y_COUNT)
        setCellSize(Math.min(xCellSize, yCellSize))
      }
    })
    updateCellSize()

    window.addEventListener('resize', updateCellSize)
    return () => {
      window.removeEventListener('resize', updateCellSize)
      updateCellSize.cancel()
    }
  }, [])

  return { ref, cellSize }
}
