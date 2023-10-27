import { useEffect } from 'react'

import { Flex } from '@chakra-ui/react'

import Pane from '#/components/Pane'
import Workspace from '#/components/Workspace'
import { createId } from '#/lib/nanoid'
import { useStore } from '#/lib/store'
import { Polygon, PolygonGroup } from '#/lib/types'

const IndexPage = () => {
  const addPolygonGroup = useStore(s => s.addPolygonGroup)
  const addPolygon = useStore(s => s.addPolygon)

  useEffect(() => {
    const defaultPolygon: Polygon = { id: createId(), name: 'Default polygon', pointIds: [] }
    const defaultPolygonGroup: PolygonGroup = {
      id: createId(),
      name: 'Default group',
      polygonIds: [defaultPolygon.id],
    }

    addPolygon(defaultPolygon)
    addPolygonGroup(defaultPolygonGroup)
  }, [addPolygon, addPolygonGroup])

  return (
    <Flex boxSize="full" justifyContent="center">
      <Workspace flexGrow={1} />
      <Pane h="full" w="full" maxW="700px" minW="200px" overflowY="scroll" />
    </Flex>
  )
}

export default IndexPage
