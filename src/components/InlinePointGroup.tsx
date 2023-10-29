import { Box, Flex, Icon, IconButton, Spacer, Tooltip } from '@chakra-ui/react'

import { DownArrowIcon, EditIcon, RemoveListIcon, UpArrowIcon } from '#/lib/icons'
import { useStore } from '#/lib/store'

import type { RawPointGroup } from '#/lib/types'

const InlinePointGroup = ({ id, name, superGroupId }: RawPointGroup & { superGroupId: string }) => {
  const selectedPointGroupId = useStore(s => s.selectedPointGroupId)
  const setSelectedPointGroupId = useStore(s => s.setSelectedPointGroupId)
  const moveDownPointGroupInSuperGroup = useStore(s => s.moveDownPointGroupInSuperGroup)
  const moveUpPointGroupInSuperGroup = useStore(s => s.moveUpPointGroupInSuperGroup)
  const setModalShown = useStore(s => s.setModalShown)
  const removePointGroupFromSuperGroup = useStore(s => s.removePointGroupFromSuperGroup)

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
        icon={<Icon as={EditIcon} />}
        aria-label="Edit"
        variant="ghost"
        size="sm"
        onClick={e => {
          e.stopPropagation()
          setModalShown('point-group')
        }}
      />
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
      <Tooltip
        label={
          <>
            Remove <b>{name ?? ''}</b> from super group
          </>
        }
      >
        <IconButton
          icon={<Icon as={RemoveListIcon} />}
          aria-label="Remove from super group"
          variant="ghost"
          size="sm"
          onClick={e => {
            e.stopPropagation()
            removePointGroupFromSuperGroup(superGroupId, id)
          }}
        />
      </Tooltip>
    </Flex>
  )
}

export default InlinePointGroup
