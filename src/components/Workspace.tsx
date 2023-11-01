import { Box, Center, CenterProps, FormControl, FormLabel, Switch } from '@chakra-ui/react'

import Canvas from '#/components/Canvas'
import { useStore } from '#/lib/store'

const Workspace = (centerProps: CenterProps) => {
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
    <Center h="full" pos="relative" userSelect="none" onClick={deselectCascade} {...centerProps}>
      <Canvas />
      <Box
        pos="absolute"
        bottom={5}
        left="50%"
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
    </Center>
  )
}

export default Workspace
