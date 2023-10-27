import { Box } from '@chakra-ui/react'

import { Point as TPoint } from '#/lib/ecs'
import { useStore } from '#/lib/store'

const Point = ({ id, point }: TPoint) => {
  const selectedPointId = useStore(s => s.selectedPointId)
  const setSelectedPointId = useStore(s => s.setSelectedPointId)
  const isSelected = selectedPointId === id

  return (
    <Box
      pos="absolute"
      bottom={point.y}
      left={point.x}
      transform="translate(-50%, 50%)"
      rounded="999px"
      boxSize="24px"
      cursor="move"
      onClick={() => setSelectedPointId(id)}
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
