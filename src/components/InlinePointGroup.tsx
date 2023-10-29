import { Box, Flex, Icon, IconButton, Spacer } from '@chakra-ui/react'

import { DownArrowIcon, UpArrowIcon } from '#/lib/icons'
import { useStore } from '#/lib/store'

import type { RawPointGroup } from '#/lib/types'

const InlinePointGroup = ({ id, name, superGroupId }: RawPointGroup & { superGroupId: string }) => {
  const selectedPointGroupId = useStore(s => s.selectedPointGroupId)
  const setSelectedPointGroupId = useStore(s => s.setSelectedPointGroupId)
  const moveDownPointGroupInSuperGroup = useStore(s => s.moveDownPointGroupInSuperGroup)
  const moveUpPointGroupInSuperGroup = useStore(s => s.moveUpPointGroupInSuperGroup)

  return (
    <Flex
      onClick={e => {
        e.stopPropagation()
        setSelectedPointGroupId(id)
      }}
      cursor="pointer"
      shadow={selectedPointGroupId === id ? '0 0 0 2px white' : undefined}
      px={2}
      rounded="md"
      alignItems="center"
      _hover={{ bg: '#444' }}
    >
      <Box>{name ?? id}</Box>
      <Spacer />
      <IconButton
        icon={<Icon as={DownArrowIcon} />}
        aria-label="Move point group down in super group"
        variant="ghost"
        size="sm"
        onClick={e => {
          e.stopPropagation()
          moveDownPointGroupInSuperGroup(superGroupId, id)
        }}
      />
      <IconButton
        icon={<Icon as={UpArrowIcon} />}
        aria-label="Move point group up in super group"
        variant="ghost"
        size="sm"
        onClick={e => {
          e.stopPropagation()
          moveUpPointGroupInSuperGroup(superGroupId, id)
        }}
      />
    </Flex>
  )
}

export default InlinePointGroup
