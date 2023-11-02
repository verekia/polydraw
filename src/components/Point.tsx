import { Box } from '@chakra-ui/react'

import { useStore } from '#/lib/store'

import type { RawPoint } from '#/lib/types'

const Point = ({ id, x, y, color, rotZ }: RawPoint) => {
  const scale = useStore(s => s.scale)
  const zoom = useStore(s => s.zoom)
  const selectedPointId = useStore(s => s.selectedPointId)
  const setSelectedPointId = useStore(s => s.setSelectedPointId)
  const setPointDraggedId = useStore(s => s.setPointDraggedId)
  const isSelected = selectedPointId === id
  const selectedPointGroupId = useStore(s => s.selectedPointGroupId)
  const pointGroups = useStore(s => s.pointGroups)
  const superGroups = useStore(s => s.superGroups)
  const mode = useStore(s => s.mode)

  const selectedAndBelongedToPointGroup = pointGroups.find(
    p => p.id === selectedPointGroupId && p.pointIds.includes(id),
  )
  const firstFoundBelongedToPointGroup = pointGroups.find(p => p.pointIds.includes(id))

  const firstFoundBelongedToSuperGroup = superGroups.find(sg =>
    sg.pointGroupIds.some(pgId => pgId === firstFoundBelongedToPointGroup?.id),
  )

  return (
    <Box
      pos="absolute"
      bottom={`${(y / scale.height) * zoom * scale.height}px`}
      left={`${(x / scale.width) * zoom * scale.width}px`}
      transform="translate(-50%, 50%)"
      rounded="999px"
      boxSize="24px"
      cursor={mode === 'select' ? (isSelected ? 'move' : 'pointer') : undefined}
      onPointerDown={e => {
        if (mode === 'add-point') {
          return
        }
        e.stopPropagation()
        setPointDraggedId(id)
        setSelectedPointId(id)
      }}
      shadow={isSelected ? '0 0 0 2px white, 0 0 0 4px black' : undefined}
      _hover={{ bg: mode === 'select' ? 'rgba(255, 255, 255, 0.4)' : undefined }}
      onClick={e => {
        mode === 'select' && e.stopPropagation()
      }}
    >
      <Box
        pos="absolute"
        rounded="999px"
        boxSize="10px"
        bg={
          color ??
          selectedAndBelongedToPointGroup?.color ??
          firstFoundBelongedToPointGroup?.color ??
          firstFoundBelongedToSuperGroup?.color ??
          'white'
        }
        left="50%"
        bottom="50%"
        border="1px solid black"
        transform="translate(-50%, 50%)"
      />
      {rotZ !== undefined && (
        <Box
          pos="absolute"
          left="50%"
          bottom="50%"
          transform={`translate(-50%, 50%) rotate(-${rotZ}deg)`}
          w="20px"
          h="5px"
        >
          <Box pos="absolute" left="14px" bg="white" h="5px" w="10px" border="1px solid black" />
        </Box>
      )}
    </Box>
  )
}

export default Point
