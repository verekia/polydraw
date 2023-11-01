import { Box, Flex, Icon, IconButton, Spacer, Tooltip } from '@chakra-ui/react'

import { DownArrowIcon, EditIcon, RemoveListIcon, UpArrowIcon } from '#/lib/icons'
import { useStore } from '#/lib/store'

import type { RawPoint } from '#/lib/types'

const InlinePoint = ({ id, name, x, y, pointGroupId }: RawPoint & { pointGroupId: string }) => {
  const selectedPointId = useStore(s => s.selectedPointId)
  const setSelectedPointId = useStore(s => s.setSelectedPointId)
  const moveDownPointInPointGroup = useStore(s => s.moveDownPointInPointGroup)
  const moveUpPointInPointGroup = useStore(s => s.moveUpPointInPointGroup)
  const setModalShown = useStore(s => s.setModalShown)
  const removePointFromPointGroup = useStore(s => s.removePointFromPointGroup)
  const isSelected = selectedPointId === id

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
        <Box>{name ?? `${x}, ${y}`}</Box>
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
        </Box>
      )}
    </Box>
  )
}

export default InlinePoint
