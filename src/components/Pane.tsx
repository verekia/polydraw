import { useState } from 'react'

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  BoxProps,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  Link,
  ListItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
  Spacer,
  Stack,
  Switch,
  Tooltip,
  UnorderedList,
  useToast,
} from '@chakra-ui/react'
import fileDownload from 'js-file-download'

import PanePoint from '#/components/PanePoint'
import PanePointGroup from '#/components/PanePointGroup'
import PaneSuperGroup from '#/components/PaneSuperGroup'
import { AddIcon, CheckIcon, CopyIcon, DeleteIcon, DownloadIcon, HelpIcon } from '#/lib/icons'
import { createId } from '#/lib/nanoid'
import { defaultStateValues, useStore } from '#/lib/store'
import { truncateDecimals } from '#/lib/util'

const Pane = (boxProps: BoxProps) => {
  const zoom = useStore(s => s.zoom)
  const setZoom = useStore(s => s.setZoom)
  const decimals = useStore(s => s.decimals)
  const setDecimals = useStore(s => s.setDecimals)
  const scale = useStore(s => s.scale)
  const setScale = useStore(s => s.setScale)
  const points = useStore(s => s.points)
  const superGroups = useStore(s => s.superGroups)
  const pointGroups = useStore(s => s.pointGroups)
  const addPointGroup = useStore(s => s.addPointGroup)
  const setSelectedPointGroupId = useStore(s => s.setSelectedPointGroupId)
  const addSuperGroup = useStore(s => s.addSuperGroup)
  const setSelectedSuperGroupId = useStore(s => s.setSelectedSuperGroupId)
  const setBackgroundImageSrc = useStore(s => s.setBackgroundImageSrc)
  const showSinglePoints = useStore(s => s.showSinglePoints)
  const setShowSinglePoints = useStore(s => s.setShowSinglePoints)
  const showSinglePointGroups = useStore(s => s.showSinglePointGroups)
  const setShowSinglePointGroups = useStore(s => s.setShowSinglePointGroups)
  const backgroundImageSrc = useStore(s => s.backgroundImageSrc)
  const toast = useToast()
  const [isCopied, setIsCopied] = useState(false)
  const pointsWithTruncatedDecimals = points.map(p => ({
    ...p,
    x: truncateDecimals(p.x, decimals),
    y: truncateDecimals(p.y, decimals),
  }))
  const { backgroundImageSrc: remove, ...projectData } = useStore.getState()

  const exportContent = {
    points: pointsWithTruncatedDecimals,
    pointGroups: pointGroups.map(({ color, isPolygon, ...pg }) => pg),
    superGroups: superGroups.map(({ id, color, ...sg }) => sg),
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

  const handleProjectImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      const data = JSON.parse(reader.result as string)
      useStore.setState({ ...data, backgroundImageSrc: undefined })
      e.target.value = ''
      toast({
        status: 'success',
        title: 'Project successfully imported!',
        description: "Don't forget to save a new version when you're done.",
        duration: 7000,
      })
    }
    reader.readAsText(file)
  }

  return (
    <Box bg="#262626" p={5} userSelect="none" {...boxProps}>
      <Flex alignItems="center" mb={5} justifyContent="center" direction="column" gap={2}>
        <Heading as="h1" textAlign="center" size="xl">
          <Image
            alt="PolyDraw Logo"
            src="/icon-192.png"
            boxSize={8}
            verticalAlign="middle"
            display="inline-block"
            mr={2}
          />
          <Box as="span" color="#f44">
            poly
          </Box>
          <Box as="span">draw</Box>
        </Heading>
        <Heading as="h2" size="md" color="#aaa" fontWeight="semibold">
          Draw Polygons, Export Coordinates
        </Heading>
      </Flex>
      <Accordion defaultIndex={0} allowToggle>
        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Workspace configuration
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={8}>
            <Flex mb={5} gap={5}>
              <FormControl>
                <FormLabel>Width</FormLabel>
                <NumberInput
                  min={1}
                  value={scale.width}
                  onChange={e => setScale({ ...scale, width: Number(e) })}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Height</FormLabel>
                <NumberInput
                  min={1}
                  value={scale.height}
                  onChange={e => setScale({ ...scale, height: Number(e) })}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Zoom</FormLabel>
                <NumberInput value={zoom} onChange={e => setZoom(Number(e))}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Max decimals</FormLabel>
                <NumberInput
                  min={0}
                  max={5}
                  value={decimals}
                  onChange={e => setDecimals(Number(e))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Flex>
            <Box mb={4}>
              <Box as="span" textDecor="underline">
                First
              </Box>
              , set your desired <b>Width</b> and <b>Height</b> and{' '}
              <Box as="span" textDecor="underline">
                do not change it later
              </Box>
              .<br />
              Then, adjust the <b>Zoom</b> to work comfortably.
            </Box>
            <Flex gap={5}>
              <FormControl>
                {backgroundImageSrc && (
                  <Tooltip label="Remove background image">
                    <IconButton
                      ml={2}
                      float="right"
                      size="xs"
                      variant="ghost"
                      colorScheme="red"
                      aria-label="Remove"
                      onClick={() => setBackgroundImageSrc()}
                      icon={<Icon as={DeleteIcon} boxSize={4} />}
                    />
                  </Tooltip>
                )}
                <FormLabel>Background image</FormLabel>
                <Input type="file" onChange={handleImageUpload} p={1} />
              </FormControl>
              <FormControl>
                <FormLabel>Load Existing Project</FormLabel>
                <Input type="file" onChange={handleProjectImport} accept=".polydraw" p={1} />
              </FormControl>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      {/* <Divider my={8} /> */}
      <SimpleGrid gap={5} columns={3} mt={10}>
        <Box>
          <Heading as="h2" size="md" mb={5} display="flex" alignItems="center" gap={2}>
            <Image src="/point.webp" alt="" boxSize={6} />
            Points
            <Tooltip
              label={
                <>
                  <b>Points</b> are defined by a position and can optionally be attached to point
                  groups.
                </>
              }
            >
              <Box cursor="help" lineHeight={0}>
                <Icon as={HelpIcon} />
              </Box>
            </Tooltip>
          </Heading>
          <Stack maxH="400px" overflowY="auto" p={1}>
            {points.map(p => (
              <PanePoint key={p.id} {...p} />
            ))}
          </Stack>
          {points.length === 0 && (
            <Box textAlign="center">
              Click on the canvas to{' '}
              <Box as="span" whiteSpace="nowrap">
                add points
              </Box>
              .
            </Box>
          )}
        </Box>
        <Box>
          <Heading as="h2" size="md" mb={5} display="flex" alignItems="center" gap={2}>
            <Image src="/group.webp" alt="" boxSize={6} /> Point Groups
            <Tooltip
              label={
                <>
                  Use <b>Point Groups</b> to define polygons or sets of points that are related to
                  each other but do not defining a shape.
                  <br />
                  <br />
                  <b>Polygon Example</b>: A forest shape.
                  <br />
                  <b>Disconnected points example</b>: Enemies.
                  <br />
                  <br />
                  If a point group is{' '}
                  <Box
                    as="b"
                    shadow="inset 0 0 0 2px white, 0 0 0 1px black"
                    px="4px"
                    py="1px"
                    display="inline-block"
                    rounded="md"
                  >
                    selected
                  </Box>
                  , new <b>points</b> will be automatically added to it.
                </>
              }
            >
              <Box cursor="help" lineHeight={0}>
                <Icon as={HelpIcon} />
              </Box>
            </Tooltip>
          </Heading>
          <Stack maxH="400px" overflowY="auto" p={1}>
            {pointGroups.map(p => (
              <PanePointGroup key={p.id} {...p} />
            ))}
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<Icon as={AddIcon} />}
              onClick={() => {
                const name = prompt('Point group name')
                if (name === null) {
                  return
                }
                const id = createId()
                addPointGroup({ id, pointIds: [], name, isPolygon: true })
                setSelectedPointGroupId(id)
              }}
            >
              Add point group
            </Button>
          </Stack>
        </Box>
        <Box>
          <Heading as="h2" size="md" mb={5} display="flex" alignItems="center" gap={2}>
            <Image src="/super.webp" alt="" boxSize={6} /> Super Groups
            <Tooltip
              label={
                <>
                  Use <b>Super Groups</b> to define a set of point groups that are related to each
                  other.
                  <br />
                  <br />
                  <b>Example</b>: Multiple forest polygons that are colored in green for
                  visualization purposes.
                  <br />
                  <br />
                  If a super group is{' '}
                  <Box
                    as="b"
                    shadow="inset 0 0 0 2px white, 0 0 0 1px black"
                    px="4px"
                    py="1px"
                    display="inline-block"
                    rounded="md"
                  >
                    selected
                  </Box>
                  , new <b>point groups</b> will be automatically added to it.
                </>
              }
            >
              <Box lineHeight={0} cursor="help">
                <Icon as={HelpIcon} />
              </Box>
            </Tooltip>
          </Heading>
          <Stack maxH="400px" overflowY="auto" p={1}>
            {superGroups.map(sg => (
              <PaneSuperGroup key={sg.id} {...sg} />
            ))}
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<Icon as={AddIcon} />}
              onClick={() => {
                const name = prompt('Super group name')
                if (name === null) {
                  return
                }
                const id = createId()
                addSuperGroup({ id, pointGroupIds: [], name })
                setSelectedSuperGroupId(id)
              }}
            >
              Add super group
            </Button>
          </Stack>
        </Box>
      </SimpleGrid>
      <Stack mt={5}>
        <FormControl display="flex" alignItems="center" gap={2}>
          <Switch
            id="single-points"
            colorScheme="red"
            isChecked={showSinglePoints}
            onChange={e => setShowSinglePoints(e.target.checked)}
          />
          <FormLabel htmlFor="single-points" mb={0} cursor="pointer">
            Hide points that are in a point group
          </FormLabel>
        </FormControl>
        <FormControl display="flex" alignItems="center" gap={2}>
          <Switch
            id="single-point-groups"
            colorScheme="red"
            isChecked={showSinglePointGroups}
            onChange={e => setShowSinglePointGroups(e.target.checked)}
          />
          <FormLabel htmlFor="single-point-groups" mb={0} cursor="pointer">
            Hide point groups that are in a super group
          </FormLabel>
        </FormControl>
      </Stack>
      <Box my={5}>
        <Stack direction="row" gap={2} mb={3}>
          <Button
            size="lg"
            bg="#f6f6f6"
            color="#333"
            _hover={{ bg: '#fff' }}
            _active={{ bg: '#fff' }}
            leftIcon={<Icon as={DownloadIcon} boxSize={5} />}
            onClick={() => fileDownload(JSON.stringify(projectData), 'project.polydraw')}
          >
            Save Project
          </Button>
          <Button
            size="lg"
            leftIcon={<Icon as={DownloadIcon} boxSize={5} />}
            onClick={() => fileDownload(JSON.stringify(exportContent), 'polydraw.json')}
          >
            Download JSON
          </Button>
          <Button
            size="lg"
            leftIcon={<Icon as={isCopied ? CheckIcon : CopyIcon} boxSize={5} />}
            onClick={() => {
              navigator.clipboard.writeText(JSON.stringify(exportContent))
              setIsCopied(true)
              setTimeout(() => setIsCopied(false), 2000)
            }}
          >
            Copy JSON
          </Button>
        </Stack>
        <Flex mt={5} gap={3}>
          <Box>
            The exported data is normalized. You will need to resolve points and point groups based
            on their IDs in your application code.{' '}
            <Link href="https://github.com/verekia/polydraw-support" isExternal fontWeight="bold">
              Learn how
            </Link>
            .
          </Box>
          <Spacer />
          <Button
            flexShrink={0}
            leftIcon={<Icon as={DeleteIcon} />}
            variant="ghost"
            colorScheme="red"
            onClick={() => {
              if (
                confirm(
                  'Are you sure you want to reset EVERYTHING? Your points, groups, and workspace settings will be lost.',
                )
              ) {
                useStore.setState(defaultStateValues)
              }
            }}
          >
            Reset all
          </Button>
        </Flex>
      </Box>
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Instructions
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={8}>
            <UnorderedList>
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
                If points order matters for your app, you can <b>move points up and down</b> in the
                list using the arrow buttons.
              </ListItem>
              <ListItem>
                If you need to organize your points as <b>point groups</b> (or polygons), create the
                point group first, then newly created points will be automatically added to it.
              </ListItem>
            </UnorderedList>
            <UnorderedList mt={5}>
              <ListItem>
                Press <b>Esc</b> or <b>click outside of the canvas</b> to deselect points, point
                groups, and super groups.
              </ListItem>
              <ListItem>
                <b>Cmd/Ctrl</b> + <b>Backspace</b> to delete the currently selected point.
              </ListItem>
            </UnorderedList>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>

      <Box textAlign="center" mt={12} mb={6}>
        <Link href="https://github.com/verekia/polydraw-support" isExternal>
          Report issues or submit feedback
        </Link>
        <br />
        <Link href="https://twitter.com/verekia" isExternal>
          @verekia
        </Link>
      </Box>
    </Box>
  )
}

export default Pane
