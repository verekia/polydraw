import { Box, Flex, HStack, Icon, IconButton, Spacer } from '@chakra-ui/react'

import { DeleteIcon, DownArrowIcon, EditIcon, UpArrowIcon } from '#/lib/icons'
import { useStore } from '#/lib/store'
import { truncateDecimals } from '#/lib/util'

import type { RawPoint } from '#/lib/types'

const PanePoint = ({ id, name, x, y }: RawPoint) => {
  const selectedPointId = useStore(s => s.selectedPointId)
  const setSelectedPointId = useStore(s => s.setSelectedPointId)
  const moveDownPoint = useStore(s => s.moveDownPoint)
  const moveUpPoint = useStore(s => s.moveUpPoint)
  const decimals = useStore(s => s.decimals)
  const setModalShown = useStore(s => s.setModalShown)
  const isSelected = selectedPointId === id

  return (
    <Flex
      shadow={isSelected ? '0 0 0 2px white' : undefined}
      rounded="md"
      onClick={() => setSelectedPointId(isSelected ? undefined : id)}
      cursor="pointer"
      px={3}
      py={1}
      userSelect="none"
      bg="#333"
      direction="column"
    >
      <Box>
        <Box>{name ?? `${truncateDecimals(x, decimals)}, ${truncateDecimals(y, decimals)}`}</Box>
      </Box>
      <Spacer />
      {isSelected && (
        <HStack spacing={0} justifyContent="right">
          <IconButton
            icon={<Icon as={EditIcon} />}
            aria-label="Edit"
            variant="ghost"
            size="sm"
            onClick={e => {
              e.stopPropagation()
              setModalShown('point')
            }}
          />
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
        </HStack>
      )}
    </Flex>
  )
}

export default PanePoint
