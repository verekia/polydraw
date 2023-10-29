import { Center, CenterProps } from '@chakra-ui/react'

import Canvas from '#/components/Canvas'
import { useStore } from '#/lib/store'

const Workspace = (centerProps: CenterProps) => {
  const setSelectedPointId = useStore(s => s.setSelectedPointId)
  const setSelectedSuperGroupId = useStore(s => s.setSelectedSuperGroupId)
  const selectedPointId = useStore(s => s.selectedPointId)
  const selectedSuperGroupId = useStore(s => s.selectedSuperGroupId)
  const selectedPointGroupId = useStore(s => s.selectedPointGroupId)
  const setSelectedPointGroupId = useStore(s => s.setSelectedPointGroupId)

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
    <Center h="full" onClick={deselectCascade} {...centerProps}>
      <Canvas />
    </Center>
  )
}

export default Workspace
