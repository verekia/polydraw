import { Box, Flex, Icon, IconButton, Spacer } from '@chakra-ui/react'

import { DownArrowIcon, EditIcon, UpArrowIcon } from '#/lib/icons'
import { useStore } from '#/lib/store'

import type { RawPoint } from '#/lib/types'

const InlinePoint = ({ id, name, x, y, pointGroupId }: RawPoint & { pointGroupId: string }) => {
  const selectedPointId = useStore(s => s.selectedPointId)
  const setSelectedPointId = useStore(s => s.setSelectedPointId)
  const moveDownPointInPointGroup = useStore(s => s.moveDownPointInPointGroup)
  const moveUpPointInPointGroup = useStore(s => s.moveUpPointInPointGroup)
  const setModalShown = useStore(s => s.setModalShown)

  return (
    <Flex
      onClick={e => {
        e.stopPropagation()
        setSelectedPointId(id)
      }}
      cursor="pointer"
      shadow={selectedPointId === id ? '0 0 0 2px white' : undefined}
      px={2}
      rounded="md"
      alignItems="center"
      _hover={{ bg: '#444' }}
    >
      <Box>{name ?? `${x}, ${y}`}</Box>
      <Spacer />
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
        aria-label="Move point down in group"
        variant="ghost"
        size="sm"
        onClick={e => {
          e.stopPropagation()
          moveDownPointInPointGroup(pointGroupId, id)
        }}
      />
      <IconButton
        icon={<Icon as={UpArrowIcon} />}
        aria-label="Move point up in group"
        variant="ghost"
        size="sm"
        onClick={e => {
          e.stopPropagation()
          moveUpPointInPointGroup(pointGroupId, id)
        }}
      />
    </Flex>
  )
}

export default InlinePoint
