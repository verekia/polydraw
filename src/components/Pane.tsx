import { Box, BoxProps, Button, Center, Heading } from '@chakra-ui/react'
import fileDownload from 'js-file-download'

import PanePoint from '#/components/PanePoint'
import { createPoint, PointEntities, points } from '#/lib/ecs'
import { useStore } from '#/lib/store'

const Pane = (boxProps: BoxProps) => {
  const canvas = useStore(s => s.canvas)

  return (
    <Box bg="#262626" py={5} {...boxProps}>
      <Heading as="h1" textAlign="center" size="lg">
        PolyDraw
      </Heading>
      <Center>
        <Button
          onClick={() => {
            createPoint({
              x: Math.round(Math.random() * canvas.width),
              y: Math.round(Math.random() * canvas.height),
            })
          }}
        >
          Create Point
        </Button>
      </Center>
      <Heading as="h2" size="md">
        Points
      </Heading>
      <PointEntities children={PanePoint} />
      <Button
        onClick={() => {
          const content = points.entities.map(p => ({ x: p.point.x, y: p.point.y }))
          console.log(content)
          fileDownload(JSON.stringify(content), 'points.json')
        }}
      >
        Download JSON
      </Button>
      <Button
        onClick={() => {
          const content = points.entities.map(p => ({ x: p.point.x, y: p.point.y }))
          navigator.clipboard.writeText(JSON.stringify(content))
        }}
      >
        Copy JSON
      </Button>
    </Box>
  )
}

export default Pane
