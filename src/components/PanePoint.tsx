import { Box, Flex, HStack, Icon, IconButton, Spacer } from '@chakra-ui/react'

import { DeleteIcon, DownArrowIcon, UpArrowIcon } from '#/lib/icons'
import { useStore } from '#/lib/store'
import { Point } from '#/lib/types'

const PanePoint = ({ id, name, x, y }: Point) => {
  const selectedPointId = useStore(s => s.selectedPointId)
  const setSelectedPointId = useStore(s => s.setSelectedPointId)
  const moveDownPoint = useStore(s => s.moveDownPoint)
  const moveUpPoint = useStore(s => s.moveUpPoint)
  const removePoint = useStore(s => s.removePoint)
  const isSelected = selectedPointId === id

  return (
    <Flex
      border={isSelected ? '1px solid red' : '1px solid transparent'}
      rounded="md"
      onClick={() => setSelectedPointId(isSelected ? undefined : id)}
      cursor="pointer"
      px={3}
      py={1}
      userSelect="none"
      bg="#333"
    >
      <Box>
        <Box>{name ?? `${x}, ${y}`}</Box>
      </Box>
      <Spacer />
      {isSelected && (
        <HStack spacing={0}>
          <IconButton
            icon={<Icon as={DownArrowIcon} />}
            aria-label="Move point down"
            variant="ghost"
            size="sm"
            onClick={e => {
              e.stopPropagation()
              moveDownPoint(id)
            }}
          />
          <IconButton
            icon={<Icon as={UpArrowIcon} />}
            aria-label="Move point up"
            variant="ghost"
            size="sm"
            onClick={e => {
              e.stopPropagation()
              moveUpPoint(id)
            }}
          />
          <IconButton
            icon={<Icon as={DeleteIcon} />}
            aria-label="Delete point"
            variant="ghost"
            size="sm"
            onClick={e => {
              e.stopPropagation()
              if (isSelected) {
                setSelectedPointId()
              }
              removePoint(id)
            }}
          />
        </HStack>
      )}
    </Flex>
  )
}

export default PanePoint
