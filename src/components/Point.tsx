import { Box } from '@chakra-ui/react'

import { useStore } from '#/lib/store'
import { Point as TPoint } from '#/lib/types'

const Point = ({ id, x, y }: TPoint) => {
  const scale = useStore(s => s.scale)
  const zoom = useStore(s => s.zoom)
  const selectedPointId = useStore(s => s.selectedPointId)
  const setSelectedPointId = useStore(s => s.setSelectedPointId)
  const updatePoint = useStore(s => s.updatePoint)
  const isDragging = useStore(s => s.isDragging)
  const setIsDragging = useStore(s => s.setIsDragging)
  const isSelected = selectedPointId === id

  return (
    <Box
      pos="absolute"
      bottom={`${(y / scale.height) * zoom * scale.height}px`}
      left={`${(x / scale.width) * zoom * scale.width}px`}
      transform="translate(-50%, 50%)"
      rounded="999px"
      boxSize="24px"
      cursor={isSelected ? 'move' : 'pointer'}
      onPointerDown={e => {
        e.stopPropagation()
        if (isSelected) {
          setIsDragging(true)
        }
        setSelectedPointId(id)
      }}
      border={isSelected ? '1px solid red' : 'none'}
      _hover={{ bg: 'rgba(255, 255, 255, 0.4)' }}
      onClick={e => {
        e.stopPropagation()
      }}
      onPointerMove={e => {
        e.stopPropagation()

        if (isDragging && e.buttons === 1) {
          updatePoint(id, { x: x + e.movementX, y: y - e.movementY })
        }
      }}
      onPointerUp={e => {
        e.stopPropagation()
        setIsDragging(false)
      }}
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
