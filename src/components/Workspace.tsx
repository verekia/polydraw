import { Center, CenterProps } from '@chakra-ui/react'

import Canvas from '#/components/Canvas'
import { useStore } from '#/lib/store'

const Workspace = (centerProps: CenterProps) => {
  const setSelectedPointId = useStore(s => s.setSelectedPointId)
  const setSelectedPolygonId = useStore(s => s.setSelectedPolygonId)
  const setSelectedPolygonGroupId = useStore(s => s.setSelectedPolygonGroupId)
  const selectedPointId = useStore(s => s.selectedPointId)
  const selectedPolygonId = useStore(s => s.selectedPolygonId)
  const selectedPolygonGroupId = useStore(s => s.selectedPolygonGroupId)

  const deselectCascade = () => {
    if (selectedPointId) {
      setSelectedPointId()
    } else if (selectedPolygonId) {
      setSelectedPolygonId()
    } else if (selectedPolygonGroupId) {
      setSelectedPolygonGroupId()
    }
  }

  return (
    <Center h="full" onClick={deselectCascade} {...centerProps}>
      <Canvas />
    </Center>
  )
}

export default Workspace
