import { Box, Flex, HStack, Icon, IconButton, Spacer, Stack, Tooltip } from '@chakra-ui/react'

import InlinePoint from '#/components/InlinePoint'
import { AddListIcon, DownArrowIcon, EditIcon, UpArrowIcon } from '#/lib/icons'
import { useStore } from '#/lib/store'

import type { RawPointGroup } from '#/lib/types'

const PanePointGroup = ({ id, name, color, pointIds }: RawPointGroup) => {
  const selectedPointGroupId = useStore(s => s.selectedPointGroupId)
  const setSelectedPointGroupId = useStore(s => s.setSelectedPointGroupId)
  const moveDownPointGroup = useStore(s => s.moveDownPointGroup)
  const moveUpPointGroup = useStore(s => s.moveUpPointGroup)
  const selectedSuperGroupId = useStore(s => s.selectedSuperGroupId)
  const setModalShown = useStore(s => s.setModalShown)
  const superGroups = useStore(s => s.superGroups)
  const addPointGroupToSuperGroup = useStore(s => s.addPointGroupToSuperGroup)
  const points = useStore(s => s.points)
  const showSinglePointGroups = useStore(s => s.showSinglePointGroups)
  const isSelected = selectedPointGroupId === id

  const selectedSuperGroup = superGroups.find(sg => sg.id === selectedSuperGroupId)

  const isInAnySuperGroup = superGroups.some(sg => sg.pointGroupIds.includes(id))

  if (showSinglePointGroups && isInAnySuperGroup) {
    return null
  }

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
      <Box>
        {color && (
          <Box
            as="span"
            display="inline-block"
            verticalAlign="middle"
            pos="relative"
            border="1px solid white"
            top="-1px"
            mr={2}
            boxSize={3}
            onClick={() => setModalShown('point-group')}
            bg={color}
          />
        )}
        {name ?? `ID: ${id}`}
      </Box>
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
                setModalShown('point-group')
              }}
            />
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
            <Tooltip
              label={
                <>
                  {selectedSuperGroup ? (
                    <>
                      Add to <b>{selectedSuperGroup?.name ?? ''}</b> super group
                    </>
                  ) : (
                    'Select a super group to add this point group to.'
                  )}
                </>
              }
            >
              <IconButton
                icon={<Icon as={AddListIcon} />}
                isDisabled={!selectedSuperGroup}
                aria-label="Add to selected super group"
                variant="ghost"
                size="sm"
                onClick={e => {
                  e.stopPropagation()
                  if (selectedSuperGroup) {
                    addPointGroupToSuperGroup(selectedSuperGroup.id, id)
                  }
                }}
              />
            </Tooltip>
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
              return <InlinePoint key={pid} {...foundPoint} pointGroupId={id} />
            })}
          </Stack>
        </Box>
      )}
    </Box>
  )
}

export default PanePointGroup
