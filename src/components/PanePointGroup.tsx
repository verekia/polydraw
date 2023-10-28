import { Box, Flex, HStack, Icon, IconButton, Spacer } from '@chakra-ui/react'

import { DeleteIcon, DownArrowIcon, UpArrowIcon } from '#/lib/icons'
import { useStore } from '#/lib/store'

import type { RawPointGroup } from '#/lib/types'

const PanePointGroup = ({ id, name, pointIds }: RawPointGroup) => {
  const selectedPointGroupId = useStore(s => s.selectedPointGroupId)
  const setSelectedPointGroupId = useStore(s => s.setSelectedPointGroupId)
  const moveDownPointGroup = useStore(s => s.moveDownPointGroup)
  const moveUpPointGroup = useStore(s => s.moveUpPointGroup)
  const removePointGroup = useStore(s => s.removePointGroup)
  const selectedPointId = useStore(s => s.selectedPointId)
  const setSelectedPointId = useStore(s => s.setSelectedPointId)
  const points = useStore(s => s.points)
  const isSelected = selectedPointGroupId === id

  return (
    <Box
      border={isSelected ? '1px solid red' : '1px solid transparent'}
      rounded="md"
      onClick={() => setSelectedPointGroupId(isSelected ? undefined : id)}
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
              aria-label="Move point group down"
              variant="ghost"
              size="sm"
              onClick={e => {
                e.stopPropagation()
                moveDownPointGroup(id)
              }}
            />
            <IconButton
              icon={<Icon as={UpArrowIcon} />}
              aria-label="Move point group up"
              variant="ghost"
              size="sm"
              onClick={e => {
                e.stopPropagation()
                moveUpPointGroup(id)
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
                  setSelectedPointGroupId()
                }
                if (
                  confirm(
                    'Are you sure you want to delete this point group? The points it references will not be deleted.',
                  )
                ) {
                  removePointGroup(id)
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

export default PanePointGroup
