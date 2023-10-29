import { Box, Flex, HStack, Icon, IconButton, Spacer } from '@chakra-ui/react'

import { DeleteIcon, DownArrowIcon, UpArrowIcon } from '#/lib/icons'
import { useStore } from '#/lib/store'

import type { RawPolygon } from '#/lib/types'

const PanePolygon = ({ id, name, pointIds }: RawPolygon) => {
  const selectedPolygonId = useStore(s => s.selectedPolygonId)
  const setSelectedPolygonId = useStore(s => s.setSelectedPolygonId)
  const moveDownPolygon = useStore(s => s.moveDownPolygon)
  const moveUpPolygon = useStore(s => s.moveUpPolygon)
  const removePolygon = useStore(s => s.removePolygon)
  const selectedPointId = useStore(s => s.selectedPointId)
  const setSelectedPointId = useStore(s => s.setSelectedPointId)
  const points = useStore(s => s.points)
  const isSelected = selectedPolygonId === id

  return (
    <Box
      shadow={isSelected ? '0 0 0 2px white' : undefined}
      rounded="md"
      onClick={() => setSelectedPolygonId(isSelected ? undefined : id)}
      cursor="pointer"
      px={3}
      py={1}
      userSelect="none"
      bg="#333"
    >
      <Flex>
        <Box>{name ?? `ID: ${id}`}</Box>
        <Spacer />
        {isSelected && (
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
        )}
      </Flex>
      {isSelected && (
        <Box>
          <Box>Points:</Box>
          {pointIds.map(pid => {
            const foundPoint = points.find(p => p.id === pid)
            if (!foundPoint) {
              return null
            }
            return (
              <Box
                key={pid}
                onClick={e => {
                  e.stopPropagation()
                  setSelectedPointId(pid)
                }}
                bg={selectedPointId === pid ? '#444' : 'transparent'}
                _hover={{ bg: '#444' }}
              >
                {foundPoint.name ?? `${foundPoint.x}, ${foundPoint.y}`}
              </Box>
            )
          })}
        </Box>
      )}
    </Box>
  )
}

export default PanePolygon
