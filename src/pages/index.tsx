import { useEffect } from 'react'

import { Flex } from '@chakra-ui/react'
import Head from 'next/head'

import Pane from '#/components/Pane'
import Workspace from '#/components/Workspace'
import { useStore } from '#/lib/store'

const IndexPage = () => {
  const points = useStore(s => s.points)
  const selectedPointId = useStore(s => s.selectedPointId)
  const selectedPolygonId = useStore(s => s.selectedPolygonId)
  const selectedPolygonGroupId = useStore(s => s.selectedPolygonGroupId)
  const selectedPointGroupId = useStore(s => s.selectedPointGroupId)
  const setSelectedPointId = useStore(s => s.setSelectedPointId)
  const setSelectedPolygonId = useStore(s => s.setSelectedPolygonId)
  const setSelectedPolygonGroupId = useStore(s => s.setSelectedPolygonGroupId)
  const setSelectedPointGroupId = useStore(s => s.setSelectedPointGroupId)
  const removePoint = useStore(s => s.removePoint)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedPointId) {
          setSelectedPointId()
        } else if (selectedPointGroupId) {
          setSelectedPointGroupId()
        } else if (selectedPolygonId) {
          setSelectedPolygonId()
        } else if (selectedPolygonGroupId) {
          setSelectedPolygonGroupId()
        }
      }

      if (e.key === 'Backspace') {
        if (selectedPointId) {
          const indexToRemove = points.findIndex(p => p.id === selectedPointId)
          removePoint(selectedPointId)
          setSelectedPointId(points[indexToRemove - 1]?.id)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [
    selectedPointId,
    selectedPolygonGroupId,
    selectedPolygonId,
    setSelectedPointId,
    setSelectedPolygonGroupId,
    setSelectedPolygonId,
    removePoint,
    points,
    setSelectedPointGroupId,
    selectedPointGroupId,
  ])

  return (
    <>
      <Flex boxSize="full" justifyContent="center">
        <Workspace flexGrow={1} />
        <Pane h="full" w="full" maxW="700px" minW="200px" overflowY="scroll" />
      </Flex>
      <Head>
        <title>PolyDraw | Draw Polygons, Export Coordinates</title>
      </Head>
    </>
  )
}

export default IndexPage
