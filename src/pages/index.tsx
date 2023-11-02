import { useEffect } from 'react'

import Head from 'next/head'

import Modals from '#/components/Modals'
import Pane from '#/components/Pane'
import Workspace from '#/components/Workspace'
import { Store, useStore } from '#/lib/store'

let localStorageState: Store

if (typeof window !== 'undefined') {
  const stateStr = localStorage.getItem('polydraw')
  if (stateStr) {
    localStorageState = JSON.parse(stateStr).state
  }
}

const IndexPage = () => {
  const points = useStore(s => s.points)
  const selectedPointId = useStore(s => s.selectedPointId)
  const selectedSuperGroupId = useStore(s => s.selectedSuperGroupId)
  const selectedPointGroupId = useStore(s => s.selectedPointGroupId)
  const setSelectedPointId = useStore(s => s.setSelectedPointId)
  const setSelectedSuperGroupId = useStore(s => s.setSelectedSuperGroupId)
  const setSelectedPointGroupId = useStore(s => s.setSelectedPointGroupId)
  const removePoint = useStore(s => s.removePoint)

  useEffect(() => {
    if (localStorageState) {
      useStore.setState(localStorageState)
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedPointId) {
          setSelectedPointId()
        } else if (selectedPointGroupId) {
          setSelectedPointGroupId()
        } else if (selectedSuperGroupId) {
          setSelectedSuperGroupId()
        }
      }

      if (e.key === 'Backspace' && (e.ctrlKey || e.metaKey)) {
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
    selectedSuperGroupId,
    setSelectedPointId,
    setSelectedSuperGroupId,
    removePoint,
    points,
    setSelectedPointGroupId,
    selectedPointGroupId,
  ])

  return (
    <>
      <Workspace position="fixed" w="50%" />
      <Pane pos="absolute" w="50%" right={0} />
      <Modals />
      <Head>
        <title>PolyDraw | Draw Polygons, Export Coordinates</title>
      </Head>
    </>
  )
}

export default IndexPage
