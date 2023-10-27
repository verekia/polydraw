import { Box } from '@chakra-ui/react'

import { useStore } from '#/lib/store'
import { Point as TPoint } from '#/lib/types'

const Point = ({ id, x, y }: TPoint) => {
  const selectedPointId = useStore(s => s.selectedPointId)
  const setSelectedPointId = useStore(s => s.setSelectedPointId)
  const isSelected = selectedPointId === id

  return (
    <Box
      pos="absolute"
      bottom={`${y}px`}
      left={`${x}px`}
      transform="translate(-50%, 50%)"
      rounded="999px"
      boxSize="24px"
      cursor="pointer"
      onClick={e => {
        e.stopPropagation()
        setSelectedPointId(id)
      }}
      border={isSelected ? '1px solid red' : 'none'}
      _hover={{ bg: 'rgba(255, 255, 255, 0.4)' }}
    >
      <Box
        pos="absolute"
        rounded="999px"
        boxSize="10px"
        bg="white"
        left="50%"
        bottom="50%"
        border="1px solid black"
        transform="translate(-50%, 50%)"
      />
    </Box>
  )
}

export default Point
