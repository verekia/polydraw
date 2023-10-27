import { Box, BoxProps, Button, Heading } from '@chakra-ui/react'
import fileDownload from 'js-file-download'

import PanePoint from '#/components/PanePoint'
import { useStore } from '#/lib/store'

const Pane = (boxProps: BoxProps) => {
  const points = useStore(s => s.points)
  const addPoint = useStore(s => s.addPoint)
  const clearPoints = useStore(s => s.clearPoints)
  const exportContent = { points }

  return (
    <Box bg="#262626" py={5} {...boxProps}>
      <Heading as="h1" textAlign="center" size="lg">
        PolyDraw
      </Heading>
      <Heading as="h2" size="md">
        Points
      </Heading>
      {points.map(p => (
        <PanePoint key={p.id} {...p} />
      ))}
      <Button
        onClick={() => {
          if (confirm('Are you sure you want to delete all points?')) {
            clearPoints()
          }
        }}
      >
        Clear points
      </Button>
      <Button onClick={() => fileDownload(JSON.stringify(exportContent), 'polydraw.json')}>
        Download JSON
      </Button>
      <Button onClick={() => navigator.clipboard.writeText(JSON.stringify(exportContent))}>
        Copy JSON
      </Button>
    </Box>
  )
}

export default Pane
