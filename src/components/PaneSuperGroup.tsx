import { Box, Flex, HStack, Icon, IconButton, Spacer } from '@chakra-ui/react'

import { DeleteIcon, DownArrowIcon, UpArrowIcon } from '#/lib/icons'
import { useStore } from '#/lib/store'

import type { RawSuperGroup } from '#/lib/types'

const PaneSuperGroup = ({ id, name, pointGroupIds }: RawSuperGroup) => {
  const selectedSuperGroupId = useStore(s => s.selectedSuperGroupId)
  const setSelectedSuperGroupId = useStore(s => s.setSelectedSuperGroupId)
  const moveDownSuperGroup = useStore(s => s.moveDownSuperGroup)
  const moveUpSuperGroup = useStore(s => s.moveUpSuperGroup)
  const removeSuperGroup = useStore(s => s.removeSuperGroup)
  const pointGroups = useStore(s => s.pointGroups)
  const isSelected = selectedSuperGroupId === id

  return (
    <Box
      px={3}
      py={1}
      shadow={isSelected ? '0 0 0 2px white' : undefined}
      rounded="md"
      onClick={() => setSelectedSuperGroupId(isSelected ? undefined : id)}
      cursor="pointer"
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
              aria-label="Move polygon group down"
              variant="ghost"
              size="sm"
              onClick={e => {
                e.stopPropagation()
                moveDownSuperGroup(id)
              }}
            />
            <IconButton
              icon={<Icon as={UpArrowIcon} />}
              aria-label="Move polygon group up"
              variant="ghost"
              size="sm"
              onClick={e => {
                e.stopPropagation()
                moveUpSuperGroup(id)
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
                  setSelectedSuperGroupId()
                }
                if (
                  confirm(
                    'Are you sure you want to delete this polygon group? The polygons it references will not be deleted.',
                  )
                ) {
                  removeSuperGroup(id)
                }
              }}
            />
          </HStack>
        )}
      </Flex>
      {isSelected && (
        <Box onClick={e => e.stopPropagation()}>
          <Box>Point groups:</Box>
          {pointGroupIds.map(pgid => {
            const foundPointGroup = pointGroups.find(p => p.id === pgid)
            return <Box key={pgid}>{foundPointGroup?.name ?? `ID: ${foundPointGroup?.id}`}</Box>
          })}
        </Box>
      )}
    </Box>
  )
}

export default PaneSuperGroup
