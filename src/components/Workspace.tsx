import { Box, BoxProps, Flex, FormControl, FormLabel, Switch } from '@chakra-ui/react'

import Canvas from '#/components/Canvas'
import { useStore } from '#/lib/store'

const Workspace = (boxProps: BoxProps) => {
  const setSelectedPointId = useStore(s => s.setSelectedPointId)
  const setSelectedSuperGroupId = useStore(s => s.setSelectedSuperGroupId)
  const selectedPointId = useStore(s => s.selectedPointId)
  const selectedSuperGroupId = useStore(s => s.selectedSuperGroupId)
  const selectedPointGroupId = useStore(s => s.selectedPointGroupId)
  const setSelectedPointGroupId = useStore(s => s.setSelectedPointGroupId)
  const mode = useStore(s => s.mode)
  const setMode = useStore(s => s.setMode)

  const deselectCascade = () => {
    if (selectedPointId) {
      setSelectedPointId()
    } else if (selectedPointGroupId) {
      setSelectedPointGroupId()
    } else if (selectedSuperGroupId) {
      setSelectedSuperGroupId()
    }
  }

  return (
    <>
      <Box pos="relative" overflow="auto" userSelect="none" h="full" {...boxProps}>
        <Flex
          overflow="auto"
          minH="full"
          alignItems="center"
          justifyContent="center"
          onClick={deselectCascade}
        >
          <Box overflow="auto" /* This fixes the canvas border stopping at the flexbox size */>
            <Canvas />
          </Box>
        </Flex>
      </Box>
      <Box
        pos="fixed"
        bottom={5}
        left="25%"
        transform="translateX(-50%)"
        // To not deselect the current point on switch toggle
        onClick={e => e.stopPropagation()}
      >
        <FormControl display="flex" alignItems="center" gap={2}>
          <Switch
            id="mode"
            colorScheme="red"
            isChecked={mode === 'select'}
            onChange={e => setMode(e.target.checked ? 'select' : 'add-point')}
          />
          <FormLabel htmlFor="mode" mb={0} cursor="pointer">
            Click to select a point or polygon
          </FormLabel>
        </FormControl>
      </Box>
    </>
  )
}

export default Workspace
