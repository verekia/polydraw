import { Box, Flex, Icon, IconButton, Spacer, Tooltip } from '@chakra-ui/react'

import { DownArrowIcon, EditIcon, InsertIcon, RemoveListIcon, UpArrowIcon } from '#/lib/icons'
import { useStore } from '#/lib/store'
import { truncateDecimals } from '#/lib/util'

import type { RawPoint } from '#/lib/types'

const InlinePoint = ({ id, name, x, y, pointGroupId }: RawPoint & { pointGroupId: string }) => {
  const selectedPointId = useStore(s => s.selectedPointId)
  const setSelectedPointId = useStore(s => s.setSelectedPointId)
  const moveDownPointInPointGroup = useStore(s => s.moveDownPointInPointGroup)
  const moveUpPointInPointGroup = useStore(s => s.moveUpPointInPointGroup)
  const setModalShown = useStore(s => s.setModalShown)
  const removePointFromPointGroup = useStore(s => s.removePointFromPointGroup)
  const decimals = useStore(s => s.decimals)
  const pointGroups = useStore(s => s.pointGroups)
  const subdivide = useStore(s => s.subdivide)
  const isSelected = selectedPointId === id
  const pointGroup = pointGroups.find(pg => pg.id === pointGroupId)

  const handleSubdivide = () => {
    if (!pointGroup) {
      return
    }
    const indexInPointGroup = pointGroup.pointIds.indexOf(id)
    const isLastInPointGroupPointIds = pointGroup.pointIds[pointGroup.pointIds.length - 1] === id
    subdivide(
      id,
      isLastInPointGroupPointIds
        ? pointGroup.pointIds[0]
        : pointGroup.pointIds[indexInPointGroup + 1],
    )
  }

  if (!pointGroup) {
    return null
  }

  return (
    <Box>
      <Box
        onClick={e => {
          e.stopPropagation()
          setSelectedPointId(isSelected ? undefined : id)
        }}
        cursor="pointer"
        shadow={isSelected ? '0 0 0 2px white' : undefined}
        px={2}
        rounded="md"
        alignItems="center"
        _hover={{ bg: '#444' }}
      >
        <Box sx={{ fontVariantNumeric: 'tabular-nums' }}>
          {name ?? `${truncateDecimals(x, decimals)}, ${truncateDecimals(y, decimals)}`}
        </Box>
        <Flex>
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
          <Tooltip label={<>Remove point from point group</>}>
            <IconButton
              icon={<Icon as={RemoveListIcon} />}
              aria-label="Remove from point group"
              variant="ghost"
              size="sm"
              onClick={e => {
                e.stopPropagation()
                removePointFromPointGroup(pointGroupId, id)
              }}
            />
          </Tooltip>
        </Flex>
      </Box>
      {isSelected && (
        <Box color="#f66" fontWeight="semibold" textAlign="center" mt={1}>
          New points will be added here
          {pointGroup.pointIds.length > 1 && (
            <Tooltip
              label={
                <>
                  <b>Subdivide</b>: Adds a new point between this point and the point below on ALL
                  point groups that have these 2 points connected.
                </>
              }
            >
              <IconButton
                ml={1}
                size="xs"
                aria-label="Subdivide"
                icon={<Icon as={InsertIcon} />}
                onClick={handleSubdivide}
              />
            </Tooltip>
          )}
        </Box>
      )}
    </Box>
  )
}

export default InlinePoint
