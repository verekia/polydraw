import { Box, BoxProps } from '@chakra-ui/react'

import Point from '#/components/Point'
import { createId } from '#/lib/nanoid'
import { useStore } from '#/lib/store'
import { truncateDecimals } from '#/lib/util'

const Canvas = (boxProps: BoxProps) => {
  const zoom = useStore(s => s.zoom)
  const decimals = useStore(s => s.decimals)
  const scale = useStore(s => s.scale)
  const points = useStore(s => s.points)
  const mode = useStore(s => s.mode)
  const addPoint = useStore(s => s.addPoint)
  const isDragging = useStore(s => s.isDragging)
  const setSelectedPointId = useStore(s => s.setSelectedPointId)

  return (
    <Box
      border="1px solid #666"
      rounded="md"
      overflow="hidden"
      pos="relative"
      cursor={mode === 'add-point' ? 'crosshair' : 'default'}
      onClick={e => {
        e.stopPropagation()

        if (isDragging) {
          return
        }
        if (mode === 'add-point') {
          const rect = e.currentTarget.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = rect.height - (e.clientY - rect.top)
          const id = createId()
          addPoint({
            id,
            x: truncateDecimals(x / zoom, decimals),
            y: truncateDecimals(y / zoom, decimals),
          })
          setSelectedPointId(id)
        }
      }}
      w={scale.width * zoom}
      h={scale.height * zoom}
      {...boxProps}
    >
      {points.map(p => (
        <Point key={p.id} {...p} />
      ))}
    </Box>
  )
}

export default Canvas
