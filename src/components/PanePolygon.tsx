import { Box, Flex, HStack, Icon, IconButton, Spacer } from '@chakra-ui/react'

import { DeleteIcon, DownArrowIcon, UpArrowIcon } from '#/lib/icons'
import { useStore } from '#/lib/store'

import type { Polygon } from '#/lib/types'

const PanePolygon = ({ id, name, pointIds }: Polygon) => {
  const selectedPolygonId = useStore(s => s.selectedPolygonId)
  const setSelectedPolygonId = useStore(s => s.setSelectedPolygonId)
  const moveDownPolygon = useStore(s => s.moveDownPolygon)
  const moveUpPolygon = useStore(s => s.moveUpPolygon)
  const removePolygon = useStore(s => s.removePolygon)
  const points = useStore(s => s.points)
  const isSelected = selectedPolygonId === id

  return (
    <Box
      border={isSelected ? '1px solid red' : '1px solid transparent'}
      rounded="md"
      onClick={() => setSelectedPolygonId(isSelected ? undefined : id)}
      cursor="pointer"
      px={3}
      py={1}
      userSelect="none"
    >
      <Flex>
        <Box>{name ?? `ID: ${id}}`}</Box>
        <Spacer />
        <HStack spacing={0}>
          <IconButton
            icon={<Icon as={DownArrowIcon} />}
            aria-label="Move polygon down"
            variant="ghost"
            size="sm"
            onClick={e => {
              e.stopPropagation()
              moveDownPolygon(id)
            }}
          />
          <IconButton
            icon={<Icon as={UpArrowIcon} />}
            aria-label="Move polygon up"
            variant="ghost"
            size="sm"
            onClick={e => {
              e.stopPropagation()
              moveUpPolygon(id)
            }}
          />
          <IconButton
            icon={<Icon as={DeleteIcon} />}
            aria-label="Delete polygon"
            variant="ghost"
            size="sm"
            onClick={e => {
              e.stopPropagation()
              if (isSelected) {
                setSelectedPolygonId()
              }
              if (
                confirm(
                  'Are you sure you want to delete this polygon? The points it references will not be deleted.',
                )
              ) {
                removePolygon(id)
              }
            }}
          />
        </HStack>
      </Flex>
      {isSelected && (
        <Box>
          <Box>Points:</Box>
          {pointIds.map(pid => {
            const foundPoint = points.find(p => p.id === pid)
            return <Box key={pid}>{foundPoint?.name ?? `ID: ${foundPoint?.id}`}</Box>
          })}
        </Box>
      )}
    </Box>
  )
}

export default PanePolygon
