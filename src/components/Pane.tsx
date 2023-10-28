import {
  Box,
  BoxProps,
  Button,
  Heading,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
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
      <Box mt={10}>
        <Heading as="h3" size="md" mb={5}>
          Instructions
        </Heading>
        <Text>This is an app to create points and polygons, and retrieve their coordinates.</Text>
        <UnorderedList mt={5}>
          <ListItem>
            Set the <b>canvas size</b> and <b>custom scale</b> you want.
          </ListItem>
          <ListItem>
            You can optionally set a <b>background image</b> to draw on top of.
          </ListItem>
          <ListItem>
            For a <b>single shape</b>, you can simply click on the canvas to create points.
          </ListItem>
          <ListItem>
            You can <b>drag a selected point</b> to adjust its position.
          </ListItem>
          <ListItem>
            When you are done, <b>Download</b> or <b>Copy</b> the JSON data to use in your app.
          </ListItem>
        </UnorderedList>
        <UnorderedList mt={5}>
          <ListItem>
            If points order matters for your app, you can <b>move points up and down</b> in the list
            using the arrow buttons.
          </ListItem>
          <ListItem>
            If you need to organize your points as <b>polygons</b>, create the polygon first, then
            newly created points will be automatically added to it.
          </ListItem>
          <ListItem>
            <b>Polygon groups</b> are useful for organizing multiple polygons. For example, you can
            have a &quot;forests&quot; group, which contains all the polygons that represent
            forests, and color them all in green.
          </ListItem>
        </UnorderedList>
        <UnorderedList mt={5}>
          <ListItem>
            Press <b>Esc</b> or <b>click outside of the canvas</b> to deselect points, polygons, and
            polygon groups.
          </ListItem>
          <ListItem>
            <b>Backspace</b> to delete the selected point.
          </ListItem>
        </UnorderedList>
      </Box>
    </Box>
  )
}

export default Pane
