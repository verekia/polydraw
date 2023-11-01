import { Box } from '@chakra-ui/react'

import { useStore } from '#/lib/store'
import { RawPoint } from '#/lib/types'

const Polygon = ({ id, points, color }: { id: string; points: RawPoint[]; color: string }) => {
  const scale = useStore(s => s.scale)
  const zoom = useStore(s => s.zoom)
  const selectedPointGroupId = useStore(s => s.selectedPointGroupId)
  const setSelectedPointGroupId = useStore(s => s.setSelectedPointGroupId)
  const mode = useStore(s => s.mode)
  const isSelected = selectedPointGroupId === id

  return (
    <Box
      as="polygon"
      onClick={e => {
        if (mode === 'select') {
          e.stopPropagation()
          setSelectedPointGroupId(isSelected ? undefined : id)
        }
      }}
      cursor={mode === 'select' ? 'pointer' : undefined}
      _hover={{ opacity: mode === 'select' ? 1 : undefined }}
      points={points.map(p => `${p.x * zoom},${(scale.height - p.y) * zoom}`).join(' ')}
      fill={color}
      opacity={isSelected ? 0.9 : 0.7}
    />
  )
}

export default Polygon
