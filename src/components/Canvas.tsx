import { Box, BoxProps } from '@chakra-ui/react'

import Point from '#/components/Point'
import { createId } from '#/lib/nanoid'
import { useStore } from '#/lib/store'

const Canvas = (boxProps: BoxProps) => {
  const canvas = useStore(s => s.canvas)
  const points = useStore(s => s.points)
  const mode = useStore(s => s.mode)
  const addPoint = useStore(s => s.addPoint)

  return (
    <Box
      border="1px solid #666"
      rounded="md"
      overflow="hidden"
      pos="relative"
      cursor={mode === 'add-point' ? 'crosshair' : 'default'}
      onClick={e => {
        if (mode === 'add-point') {
          const rect = e.currentTarget.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = canvas.height - (e.clientY - rect.top)
          addPoint({
            id: createId(),
            x: Math.round(x / canvas.zoomLevel),
            y: Math.round(y / canvas.zoomLevel),
          })
        }
      }}
      w={canvas.width * canvas.zoomLevel}
      h={canvas.height * canvas.zoomLevel}
      {...boxProps}
    >
      {points.map(p => (
        <Point key={p.id} {...p} />
      ))}
    </Box>
  )
}

export default Canvas
