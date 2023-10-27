import { Box, BoxProps, Button, Heading, SimpleGrid, Stack } from '@chakra-ui/react'
import fileDownload from 'js-file-download'

import PanePoint from '#/components/PanePoint'
import PanePolygon from '#/components/PanePolygon'
import PanePolygonGroup from '#/components/PanePolygonGroup'
import { createId } from '#/lib/nanoid'
import { useStore } from '#/lib/store'

const Pane = (boxProps: BoxProps) => {
  const points = useStore(s => s.points)
  const polygons = useStore(s => s.polygons)
  const polygonGroups = useStore(s => s.polygonGroups)
  const clearPoints = useStore(s => s.clearPoints)
  const setSelectedPolygonId = useStore(s => s.setSelectedPolygonId)
  const addPolygonGroup = useStore(s => s.addPolygonGroup)
  const setSelectedPolygonGroupId = useStore(s => s.setSelectedPolygonGroupId)
  const addPolygon = useStore(s => s.addPolygon)
  const exportContent = {
    points,
    ...(polygons.length > 0 ? { polygons } : {}),
    ...(polygonGroups.length > 0 ? { polygonGroups } : {}),
  }

  return (
    <Box bg="#262626" p={5} {...boxProps}>
      <Heading as="h1" textAlign="center" size="lg" mb={8}>
        PolyDraw
      </Heading>
      <SimpleGrid gap={5} columns={3}>
        <Box>
          <Heading as="h2" size="md" mb={5}>
            Points
          </Heading>
          <Stack>
            {points.map(p => (
              <PanePoint key={p.id} {...p} />
            ))}
          </Stack>
        </Box>
        <Box>
          <Heading as="h2" size="md" mb={5}>
            Polygons
          </Heading>
          <Stack>
            {polygons.map(p => (
              <PanePolygon key={p.id} {...p} />
            ))}
            <Button
              onClick={() => {
                const name = prompt('Polygon name')
                if (name === null) {
                  return
                }
                const id = createId()
                addPolygon({ id, pointIds: [], name })
                setSelectedPolygonId(id)
              }}
            >
              Add polygon
            </Button>
          </Stack>
        </Box>
        <Box>
          <Heading as="h2" size="md" mb={5}>
            Polygon Groups
          </Heading>
          {polygonGroups.map(p => (
            <PanePolygonGroup key={p.id} {...p} />
          ))}
          <Button
            onClick={() => {
              const name = prompt('Polygon group name')
              if (name === null) {
                return
              }
              const id = createId()
              addPolygonGroup({ id, polygonIds: [], name })
              setSelectedPolygonGroupId(id)
            }}
          >
            Add polygon group
          </Button>
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
