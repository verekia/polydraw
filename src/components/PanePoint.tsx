import { Box, Flex, HStack, Icon, IconButton, Spacer, Tooltip } from '@chakra-ui/react'

import { AddListIcon, DownArrowIcon, EditIcon, UpArrowIcon } from '#/lib/icons'
import { useStore } from '#/lib/store'
import { truncateDecimals } from '#/lib/util'

import type { RawPoint } from '#/lib/types'

const PanePoint = ({ id, name, x, y, color }: RawPoint) => {
  const selectedPointId = useStore(s => s.selectedPointId)
  const setSelectedPointId = useStore(s => s.setSelectedPointId)
  const moveDownPoint = useStore(s => s.moveDownPoint)
  const moveUpPoint = useStore(s => s.moveUpPoint)
  const decimals = useStore(s => s.decimals)
  const setModalShown = useStore(s => s.setModalShown)
  const isSelected = selectedPointId === id
  const selectedPointGroupId = useStore(s => s.selectedPointGroupId)
  const pointGroups = useStore(s => s.pointGroups)
  const addPointToPointGroup = useStore(s => s.addPointToPointGroup)
  const showSinglePoints = useStore(s => s.showSinglePoints)

  const selectedPointGroup = pointGroups.find(pg => pg.id === selectedPointGroupId)

  const isInAnyPointGroupOrPolygon = pointGroups.some(pg => pg.pointIds.includes(id))

  if (showSinglePoints && isInAnyPointGroupOrPolygon && !isSelected) {
    return null
  }

  return (
    <Box>
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
        <Box fontWeight="semibold" sx={{ fontVariantNumeric: 'tabular-nums' }}>
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
          {name ?? `${truncateDecimals(x, decimals)}, ${truncateDecimals(y, decimals)}`}
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
            <Tooltip
              label={
                <>
                  {selectedPointGroup
                    ? (
                        <>
                          Add to <b>{selectedPointGroup.name}</b> point group
                        </>
                      ) ?? 'selected point group'
                    : 'Select a point group to add this point to.'}
                </>
              }
            >
              <IconButton
                icon={<Icon as={AddListIcon} />}
                isDisabled={!selectedPointGroup}
                aria-label="Add to selected point group"
                variant="ghost"
                size="sm"
                onClick={e => {
                  e.stopPropagation()
                  if (selectedPointGroup) {
                    addPointToPointGroup(selectedPointGroup.id, id)
                  }
                }}
              />
            </Tooltip>
          </HStack>
        )}
      </Flex>
      {isSelected && (
        <Box color="#f66" fontWeight="semibold" textAlign="center" mt={1}>
          New points will be added here
        </Box>
      )}
    </Box>
  )
}

export default PanePoint
