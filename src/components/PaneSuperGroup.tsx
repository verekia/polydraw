import { Box, Flex, HStack, Icon, IconButton, Spacer, Stack } from '@chakra-ui/react'

import InlinePointGroup from '#/components/InlinePointGroup'
import { DownArrowIcon, EditIcon, HiddenIcon, UpArrowIcon, VisibleIcon } from '#/lib/icons'
import { useStore } from '#/lib/store'

import type { RawSuperGroup } from '#/lib/types'

const PaneSuperGroup = ({ id, name, color, pointGroupIds, visible }: RawSuperGroup) => {
  const selectedSuperGroupId = useStore(s => s.selectedSuperGroupId)
  const setSelectedSuperGroupId = useStore(s => s.setSelectedSuperGroupId)
  const moveDownSuperGroup = useStore(s => s.moveDownSuperGroup)
  const moveUpSuperGroup = useStore(s => s.moveUpSuperGroup)
  const pointGroups = useStore(s => s.pointGroups)
  const setModalShown = useStore(s => s.setModalShown)
  const updateSuperGroup = useStore(s => s.updateSuperGroup)
  const isSelected = selectedSuperGroupId === id

  return (
    <Box
      px={3}
      py={2}
      shadow={isSelected ? '0 0 0 2px white' : undefined}
      rounded="md"
      onClick={() => setSelectedSuperGroupId(isSelected ? undefined : id)}
      cursor="pointer"
      userSelect="none"
      bg="#333"
      _hover={{ '& .visibility': { opacity: 1 } }}
      sx={{ '& .visibility': { opacity: visible === false ? 1 : 0 } }}
    >
      <Flex fontWeight="semibold" gap={2} alignItems="center">
        {color && (
          <Box
            border="1px solid white"
            boxSize={3}
            onClick={() => setModalShown('super-group')}
            bg={color}
          />
        )}
        {name ?? `ID: ${id}`}
        <Spacer />
        <IconButton
          className="visibility"
          icon={<Icon as={visible === false ? HiddenIcon : VisibleIcon} boxSize={4} />}
          aria-label="Toggle visibility"
          variant="ghost"
          size="xs"
          colorScheme={visible === false ? 'red' : undefined}
          onClick={e => {
            e.stopPropagation()
            updateSuperGroup(id, { visible: visible === false ? undefined : false })
          }}
        />
      </Flex>
      <Flex>
        <Spacer />
        {isSelected && (
          <HStack spacing={0}>
            <IconButton
              icon={<Icon as={EditIcon} />}
              aria-label="Edit"
              variant="ghost"
              size="sm"
              onClick={e => {
                e.stopPropagation()
                setModalShown('super-group')
              }}
            />
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
          </HStack>
        )}
      </Flex>
      {isSelected && (
        <Box onClick={e => e.stopPropagation()}>
          <Box mb={2}>Point groups:</Box>
          <Stack>
            {pointGroupIds.map(pgid => {
              const foundPointGroup = pointGroups.find(p => p.id === pgid)
              if (!foundPointGroup) {
                return null
              }
              return <InlinePointGroup key={pgid} {...foundPointGroup} superGroupId={id} />
            })}
          </Stack>
        </Box>
      )}
    </Box>
  )
}

export default PaneSuperGroup
