import { Box, BoxProps } from '@chakra-ui/react'

import Point from '#/components/Point'
import { PointEntities } from '#/lib/ecs'
import { useStore } from '#/lib/store'

const Canvas = (boxProps: BoxProps) => {
  const canvas = useStore(s => s.canvas)

  return (
    <Box
      border="1px solid #666"
      rounded="md"
      overflow="hidden"
      pos="relative"
      w={canvas.width * canvas.zoomLevel}
      h={canvas.height * canvas.zoomLevel}
      {...boxProps}
    >
      <PointEntities children={Point} />
    </Box>
  )
}

export default Canvas
