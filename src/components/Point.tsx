import { Box } from '@chakra-ui/react'

import { useStore } from '#/lib/store'
import { truncateDecimals } from '#/lib/util'

import type { RawPoint } from '#/lib/types'

const Point = ({ id, x, y, color }: RawPoint) => {
  const scale = useStore(s => s.scale)
  const zoom = useStore(s => s.zoom)
  const decimals = useStore(s => s.decimals)
  const selectedPointId = useStore(s => s.selectedPointId)
  const setSelectedPointId = useStore(s => s.setSelectedPointId)
  const updatePoint = useStore(s => s.updatePoint)
  const isDragging = useStore(s => s.isDragging)
  const setIsDragging = useStore(s => s.setIsDragging)
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
        if (isSelected) {
          setIsDragging(true)
        }
        setSelectedPointId(id)
      }}
      shadow={mode === 'select' && isSelected ? '0 0 0 2px white, 0 0 0 4px black' : undefined}
      _hover={{ bg: mode === 'select' ? 'rgba(255, 255, 255, 0.4)' : undefined }}
      onClick={e => {
        mode === 'select' && e.stopPropagation()
      }}
      onPointerMove={e => {
        if (mode === 'add-point') {
          return
        }
        e.stopPropagation()

        if (isDragging && e.buttons === 1) {
          updatePoint(id, {
            x: truncateDecimals(x + e.movementX / zoom, decimals),
            y: truncateDecimals(y - e.movementY / zoom, decimals),
          })
        }
      }}
      onPointerUp={e => {
        if (mode === 'add-point') {
          return
        }
        e.stopPropagation()
        setIsDragging(false)
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
    </Box>
  )
}

export default Point
