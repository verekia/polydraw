import { Box, Flex, HStack, Icon, IconButton, Spacer, Stack } from '@chakra-ui/react'

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
  const moveDownPointInPointGroup = useStore(s => s.moveDownPointInPointGroup)
  const moveUpPointInPointGroup = useStore(s => s.moveUpPointInPointGroup)
  const points = useStore(s => s.points)
  const isSelected = selectedPointGroupId === id

  return (
    <Box
      shadow={isSelected ? '0 0 0 2px white' : undefined}
      rounded="md"
      onClick={() => setSelectedPointGroupId(isSelected ? undefined : id)}
      cursor="pointer"
      px={3}
      py={2}
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
        <Box onClick={e => e.stopPropagation()}>
          <Box mb={2}>Points:</Box>
          <Stack>
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
                  shadow={selectedPointId === pid ? '0 0 0 2px white' : undefined}
                  px={2}
                  rounded="md"
                  _hover={{ bg: '#444' }}
                >
                  <Flex>
                    <Box>{foundPoint.name ?? `${foundPoint.x}, ${foundPoint.y}`}</Box>
                    <Spacer />
                    <IconButton
                      icon={<Icon as={DownArrowIcon} />}
                      aria-label="Move point down in group"
                      variant="ghost"
                      size="sm"
                      onClick={e => {
                        e.stopPropagation()
                        moveDownPointInPointGroup(id, pid)
                      }}
                    />
                    <IconButton
                      icon={<Icon as={UpArrowIcon} />}
                      aria-label="Move point up in group"
                      variant="ghost"
                      size="sm"
                      onClick={e => {
                        e.stopPropagation()
                        moveUpPointInPointGroup(id, pid)
                      }}
                    />
                  </Flex>
                </Box>
              )
            })}
          </Stack>
        </Box>
      )}
    </Box>
  )
}

export default PanePointGroup
