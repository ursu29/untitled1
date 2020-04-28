import { useMediaQuery } from 'react-responsive'
import { COLLAPSE_WIDTH } from '../config'

const SMALL = 15
const LARGE = 60

const OFFSETS = { SMALL, LARGE }

function useOffset() {
  const isLarge = useMediaQuery({ minWidth: COLLAPSE_WIDTH })
  return {
    offset: isLarge ? LARGE : SMALL,
    offsets: OFFSETS,
  }
}

export default useOffset
