import { Box, Flex, HStack, Icon, IconButton, Spacer } from '@chakra-ui/react'

import { DeleteIcon, DownArrowIcon, UpArrowIcon } from '#/lib/icons'
import { useStore } from '#/lib/store'

import type { PolygonGroup } from '#/lib/types'

const PanePolygonGroup = ({ id, name, polygonIds }: PolygonGroup) => {
  const selectedPolygonGroupId = useStore(s => s.selectedPolygonGroupId)
  const setSelectedPolygonGroupId = useStore(s => s.setSelectedPolygonGroupId)
  const moveDownPolygonGroup = useStore(s => s.moveDownPolygonGroup)
  const moveUpPolygonGroup = useStore(s => s.moveUpPolygonGroup)
  const removePolygonGroup = useStore(s => s.removePolygonGroup)
  const polygons = useStore(s => s.polygons)
  const isSelected = selectedPolygonGroupId === id

  return (
    <Box
      px={3}
      py={1}
      border={isSelected ? '1px solid red' : '1px solid transparent'}
      rounded="md"
      onClick={() => setSelectedPolygonGroupId(isSelected ? undefined : id)}
      cursor="pointer"
      userSelect="none"
    >
      <Flex>
        <Box>{name ?? `ID: ${id}}`}</Box>
        <Spacer />
        <HStack spacing={0}>
          <IconButton
            icon={<Icon as={DownArrowIcon} />}
            aria-label="Move polygon group down"
            variant="ghost"
            size="sm"
            onClick={e => {
              e.stopPropagation()
              moveDownPolygonGroup(id)
            }}
          />
          <IconButton
            icon={<Icon as={UpArrowIcon} />}
            aria-label="Move polygon group up"
            variant="ghost"
            size="sm"
            onClick={e => {
              e.stopPropagation()
              moveUpPolygonGroup(id)
            }}
          />
          <IconButton
            icon={<Icon as={DeleteIcon} />}
            aria-label="Delete polygon group"
            variant="ghost"
            size="sm"
            onClick={e => {
              e.stopPropagation()
              if (isSelected) {
                setSelectedPolygonGroupId()
              }
              if (
                confirm(
                  'Are you sure you want to delete this polygon group? The polygons it references will not be deleted.',
                )
              ) {
                removePolygonGroup(id)
              }
            }}
          />
        </HStack>
      </Flex>
      {isSelected && (
        <Box>
          <Box>Polygons:</Box>
          {polygonIds.map(pid => {
            const foundPolygon = polygons.find(p => p.id === pid)
            return <Box key={pid}>{foundPolygon?.name ?? `ID: ${foundPolygon?.id}`}</Box>
          })}
        </Box>
      )}
    </Box>
  )
}

export default PanePolygonGroup
