import { Box, BoxProps } from '@chakra-ui/react'

import Point from '#/components/Point'
import Polygon from '#/components/Polygon'
import { createId } from '#/lib/nanoid'
import { useStore } from '#/lib/store'

const Canvas = (boxProps: BoxProps) => {
  const zoom = useStore(s => s.zoom)
  const scale = useStore(s => s.scale)
  const points = useStore(s => s.points)
  const addPoint = useStore(s => s.addPoint)
  const pointDraggedId = useStore(s => s.pointDraggedId)
  const setPointDraggedId = useStore(s => s.setPointDraggedId)
  const backgroundImageSrc = useStore(s => s.backgroundImageSrc)
  const updatePoint = useStore(s => s.updatePoint)
  const pointGroups = useStore(s => s.pointGroups)
  const superGroups = useStore(s => s.superGroups)
  const resolvedPointGroups = pointGroups.map(pg => ({
    ...pg,
    points: pg.pointIds.map(id => points.find(p => p.id === id)!),
  }))
  const pointDragged = points.find(p => p.id === pointDraggedId)

  return (
    <Box
      border="1px solid #666"
      rounded="md"
      overflow="hidden"
      pos="relative"
      cursor="crosshair"
      userSelect="none"
      onClick={e => {
        e.stopPropagation()

        setPointDraggedId()

        if (pointDraggedId) {
          return
        }

        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = rect.height - (e.clientY - rect.top)
        addPoint({ id: createId(), x: x / zoom, y: y / zoom })
      }}
      onPointerMove={e => {
        e.stopPropagation()

        if (pointDragged && e.buttons === 1) {
          updatePoint(pointDragged.id, {
            x: pointDragged.x + e.movementX / zoom,
            y: pointDragged.y - e.movementY / zoom,
          })
        }
      }}
      onPointerUp={() => setPointDraggedId()}
      w={`${scale.width * zoom}px`}
      h={`${scale.height * zoom}px`}
      bg={`url(${backgroundImageSrc})`}
      bgSize="contain"
      bgRepeat="no-repeat"
      bgPosition="center"
      {...boxProps}
    >
      {points.map(p => (
        <Point key={p.id} {...p} />
      ))}
      <Box as="svg" boxSize="full">
        {resolvedPointGroups.map(pg => {
          const firstFoundSuperGroup = superGroups.find(sg => sg.pointGroupIds.includes(pg.id))

          if (!pg.isPolygon) {
            return null
          }

          return (
            <Polygon
              key={pg.id}
              id={pg.id}
              color={pg.color ?? firstFoundSuperGroup?.color ?? '#fff'}
              points={pg.points}
            />
          )
        })}
      </Box>
    </Box>
  )
}

export default Canvas
