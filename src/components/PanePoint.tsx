import { Box } from '@chakra-ui/react'

import { Point } from '#/lib/ecs'
import { useReactiveHTMLSlow } from '#/lib/hooks'
import { useStore } from '#/lib/store'

const PanePoint = ({ id, point }: Point) => {
  const x = useReactiveHTMLSlow(() => point.x)
  const y = useReactiveHTMLSlow(() => point.y)

  const selectedPointId = useStore(s => s.selectedPointId)
  const setSelectedPointId = useStore(s => s.setSelectedPointId)
  const isSelected = selectedPointId === id

  return (
    <Box
      border={isSelected ? '1px solid red' : '1px solid transparent'}
      onClick={() => setSelectedPointId(id)}
      cursor="pointer"
      p={1}
    >
      x: {x}, y: {y}
    </Box>
  )
}

export default PanePoint
