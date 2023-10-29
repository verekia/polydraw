import {
  Box,
  BoxProps,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  ListItem,
  SimpleGrid,
  Stack,
  Tooltip,
  UnorderedList,
} from '@chakra-ui/react'
import fileDownload from 'js-file-download'

import PanePoint from '#/components/PanePoint'
import PanePointGroup from '#/components/PanePointGroup'
import PanePolygon from '#/components/PanePolygon'
import PanePolygonGroup from '#/components/PanePolygonGroup'
import { HelpIcon } from '#/lib/icons'
import { createId } from '#/lib/nanoid'
import { useStore } from '#/lib/store'
import { truncateDecimals } from '#/lib/util'

const Pane = (boxProps: BoxProps) => {
  const zoom = useStore(s => s.zoom)
  const setZoom = useStore(s => s.setZoom)
  const decimals = useStore(s => s.decimals)
  const setDecimals = useStore(s => s.setDecimals)
  const scale = useStore(s => s.scale)
  const setScale = useStore(s => s.setScale)
  const points = useStore(s => s.points)
  const polygons = useStore(s => s.polygons)
  const polygonGroups = useStore(s => s.polygonGroups)
  const pointGroups = useStore(s => s.pointGroups)
  const addPointGroup = useStore(s => s.addPointGroup)
  const setSelectedPointGroupId = useStore(s => s.setSelectedPointGroupId)
  const clearPoints = useStore(s => s.clearPoints)
  const clearPolygons = useStore(s => s.clearPolygons)
  const clearPolygonGroups = useStore(s => s.clearPolygonGroups)
  const clearPointGroups = useStore(s => s.clearPointGroups)
  const setSelectedPolygonId = useStore(s => s.setSelectedPolygonId)
  const addPolygonGroup = useStore(s => s.addPolygonGroup)
  const setSelectedPolygonGroupId = useStore(s => s.setSelectedPolygonGroupId)
  const setBackgroundImageSrc = useStore(s => s.setBackgroundImageSrc)
  const setPoints = useStore(s => s.setPoints)
  const setPolygons = useStore(s => s.setPolygons)
  const setPolygonGroups = useStore(s => s.setPolygonGroups)
  const setPointGroups = useStore(s => s.setPointGroups)
  const addPolygon = useStore(s => s.addPolygon)
  const pointsWithTruncatedDecimals = points.map(p => ({
    ...p,
    x: truncateDecimals(p.x, decimals),
    y: truncateDecimals(p.y, decimals),
  }))
  const exportContent = {
    points: pointsWithTruncatedDecimals,
    pointGroups,
    polygons,
    polygonGroups,
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => setBackgroundImageSrc(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleJSONImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      const data = JSON.parse(reader.result as string)
      clearPoints()
      clearPolygons()
      clearPolygonGroups()
      clearPointGroups()
      setPoints(data.points)
      setPolygons(data.polygons)
      setPolygonGroups(data.polygonGroups)
      setPointGroups(data.pointGroups)
    }
    reader.readAsText(file)
  }

  return (
    <Box bg="#262626" p={5} {...boxProps}>
      <Flex alignItems="center" mb={8} justifyContent="center" direction="column" gap={2}>
        <Heading as="h1" textAlign="center" size="xl">
          <Box as="span" color="#f44">
            poly
          </Box>
          <Box as="span">draw</Box>
        </Heading>
        <Heading as="h2" size="md" color="#999" fontWeight="semibold">
          Draw Polygons, Export Coordinates
        </Heading>
      </Flex>
      <Flex mb={5} gap={5}>
        <FormControl>
          <FormLabel>Width</FormLabel>
          <Input
            type="number"
            value={scale.width}
            onChange={e => setScale({ ...scale, width: Number(e.target.value) })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Height</FormLabel>
          <Input
            type="number"
            value={scale.height}
            onChange={e => setScale({ ...scale, height: Number(e.target.value) })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Zoom</FormLabel>
          <Input type="number" value={zoom} onChange={e => setZoom(Number(e.target.value))} />
        </FormControl>
        <FormControl>
          <FormLabel>Max decimals</FormLabel>
          <Input
            type="number"
            min={0}
            max={5}
            value={decimals}
            onChange={e => setDecimals(Number(e.target.value))}
          />
        </FormControl>
      </Flex>
      <Flex gap={5}>
        <FormControl mb={10}>
          <FormLabel>Background image</FormLabel>
          <Input type="file" onChange={handleImageUpload} p={1} />
        </FormControl>
        <FormControl mb={10}>
          <FormLabel>Import JSON</FormLabel>
          <Input type="file" onChange={handleJSONImport} p={1} />
        </FormControl>
      </Flex>
      <SimpleGrid gap={5} columns={3}>
        <Box>
          <Heading as="h2" size="md" mb={5}>
            Points
            <Tooltip
              label={
                <>
                  <b>Points</b> are the most basic building block. They are defined by a position.
                  They exist on their own and are not necessarily attached to polygons or point
                  groups. A single point can be attached to multiple polygons and point groups.
                </>
              }
            >
              <Box display="inline-block" verticalAlign="middle" ml={2} cursor="help">
                <Icon as={HelpIcon} />
              </Box>
            </Tooltip>
          </Heading>
          <Stack>
            {points.map(p => (
              <PanePoint key={p.id} {...p} />
            ))}
          </Stack>
        </Box>
        <Box>
          <Heading as="h2" size="md" mb={5}>
            Point Groups
            <Tooltip
              label={
                <>
                  Use <b>Point Groups</b> to define a set of points that are related to each other,
                  but 🛑 <b>do not define a shape</b>. If you want to define a shape, use{' '}
                  <b>Polygons</b> instead.
                  <br />
                  <br />
                  <b>Example</b>: Enemies on a map.
                  <br />
                  <br />
                  If a point group is{' '}
                  <Box as="b" border="1px solid red" display="inline-block" px="3px" rounded="md">
                    selected
                  </Box>
                  , new <b>points</b> will be automatically added to it.
                </>
              }
            >
              <Box display="inline-block" verticalAlign="middle" ml={2} cursor="help">
                <Icon as={HelpIcon} />
              </Box>
            </Tooltip>
          </Heading>
          <Stack>
            {pointGroups.map(p => (
              <PanePointGroup key={p.id} {...p} />
            ))}
            <Button
              onClick={() => {
                const name = prompt('Point group name')
                if (name === null) {
                  return
                }
                const id = createId()
                addPointGroup({ id, pointIds: [], name })
                setSelectedPointGroupId(id)
              }}
            >
              Add point group
            </Button>
          </Stack>
        </Box>
        <Box>
          <Heading as="h2" size="md" mb={5}>
            Polygons
            <Tooltip
              label={
                <>
                  Use <b>Polygons</b> to define shapes from a list of points. The order of the
                  points matters! Each polygon defines its own order of points so feel free to
                  reorder them as you wish.
                  <br />
                  <br />
                  <b>Example</b>: The shape of a forest on a map.
                  <br />
                  <br />
                  If a polygon is{' '}
                  <Box as="b" border="1px solid red" display="inline-block" px="3px" rounded="md">
                    selected
                  </Box>
                  , new <b>points</b> will be automatically added to it.
                </>
              }
            >
              <Box display="inline-block" verticalAlign="middle" ml={2} cursor="help">
                <Icon as={HelpIcon} />
              </Box>
            </Tooltip>
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
            <Tooltip
              label={
                <>
                  Use <b>Polygon Groups</b> to define a set of polygons that are related to each
                  other.
                  <br />
                  <br />
                  <b>Example</b>: Multiple forest polygons that are colored in green for
                  visualization purposes.
                  <br />
                  <br />
                  If a polygon group is{' '}
                  <Box as="b" border="1px solid red" display="inline-block" px="3px" rounded="md">
                    selected
                  </Box>
                  , new <b>polygons</b> will be automatically added to it.
                </>
              }
            >
              <Box display="inline-block" verticalAlign="middle" ml={2} cursor="help">
                <Icon as={HelpIcon} />
              </Box>
            </Tooltip>
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
      <Box my={10}>
        <Button
          onClick={() => {
            if (confirm('Are you sure you want to delete all points, polygons, and groups?')) {
              clearPoints()
              clearPolygons()
              clearPolygonGroups()
              clearPointGroups()
            }
          }}
        >
          Reset all
        </Button>
        <Button onClick={() => fileDownload(JSON.stringify(exportContent), 'polydraw.json')}>
          Download JSON
        </Button>
        <Button onClick={() => navigator.clipboard.writeText(JSON.stringify(exportContent))}>
          Copy JSON
        </Button>
        <Button onClick={() => navigator.clipboard.writeText('TODO')}>Copy join logic</Button>
      </Box>
      <Box mt={10}>
        <Heading as="h3" size="md" mb={5}>
          Instructions
        </Heading>
        <UnorderedList mt={5}>
          <ListItem>
            <Box as="b" textDecor="underline">
              FIRST
            </Box>
            , set the <b>Width</b> and <b>Height</b> you want for your desired output. Changing it
            later on will mess up your coordinates. Then, adjust the <b>Zoom</b> to work
            comfortably.
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
            <b>Cmd/Ctrl</b> + <b>Backspace</b> to delete the selected point.
          </ListItem>
        </UnorderedList>
      </Box>
    </Box>
  )
}

export default Pane
