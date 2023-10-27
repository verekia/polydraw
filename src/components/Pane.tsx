import { Box, BoxProps, Button, Flex, Heading, SimpleGrid, Spacer } from '@chakra-ui/react'
import fileDownload from 'js-file-download'

import PanePoint from '#/components/PanePoint'
import PanePolygon from '#/components/PanePolygon'
import PanePolygonGroup from '#/components/PanePolygonGroup'
import { useStore } from '#/lib/store'

const Pane = (boxProps: BoxProps) => {
  const points = useStore(s => s.points)
  const polygons = useStore(s => s.polygons)
  const polygonGroups = useStore(s => s.polygonGroups)
  const clearPoints = useStore(s => s.clearPoints)
  const exportContent = { points, polygons, polygonGroups }

  return (
    <Box bg="#262626" p={5} {...boxProps}>
      <Heading as="h1" textAlign="center" size="lg" mb={8}>
        PolyDraw
      </Heading>
      <SimpleGrid gap={5} columns={3}>
        <Box>
          <Heading as="h2" size="md">
            Points
          </Heading>
          {points.map(p => (
            <PanePoint key={p.id} {...p} />
          ))}
        </Box>
        <Box>
          <Heading as="h2" size="md">
            Polygons
          </Heading>
          {polygons.map(p => (
            <PanePolygon key={p.id} {...p} />
          ))}
        </Box>
        <Box>
          <Heading as="h2" size="md">
            Polygon Groups
          </Heading>
          {polygonGroups.map(p => (
            <PanePolygonGroup key={p.id} {...p} />
          ))}
        </Box>
      </SimpleGrid>
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
