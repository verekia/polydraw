import { useEffect } from 'react'

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Spacer,
  Stack,
} from '@chakra-ui/react'

import { DeleteIcon } from '#/lib/icons'
import { useStore } from '#/lib/store'

const PointModal = () => {
  const modalShown = useStore(s => s.modalShown)
  const setModalShown = useStore(s => s.setModalShown)
  const selectedPointId = useStore(s => s.selectedPointId)
  const points = useStore(s => s.points)
  const point = points.find(p => p.id === selectedPointId)
  const updatePoint = useStore(s => s.updatePoint)
  const removePoint = useStore(s => s.removePoint)
  const onClose = () => setModalShown()

  useEffect(() => {
    if (!point) {
      setModalShown()
    }
  }, [point, setModalShown])

  if (!point) {
    return null
  }

  return (
    <Drawer placement="right" onClose={onClose} isOpen={modalShown === 'point'}>
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Edit point</DrawerHeader>

        <DrawerBody>
          <Stack>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={point.name}
                onChange={e => updatePoint(point.id, { name: e.target.value || undefined })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>X</FormLabel>
              <Input
                type="number"
                value={point.x}
                onChange={e => updatePoint(point.id, { x: Number(e.target.value) })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Y</FormLabel>
              <Input
                type="number"
                value={point.y}
                onChange={e => updatePoint(point.id, { y: Number(e.target.value) })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Color</FormLabel>
              <Input
                type="text"
                value={point.color}
                onChange={e => updatePoint(point.id, { color: e.target.value || undefined })}
              />
              <Input
                type="color"
                value={point.color ?? '#000000'}
                onChange={e => updatePoint(point.id, { color: e.target.value || undefined })}
              />
            </FormControl>
          </Stack>
        </DrawerBody>

        <DrawerFooter>
          <Button
            colorScheme="red"
            variant="ghost"
            leftIcon={<Icon as={DeleteIcon} />}
            onClick={() =>
              confirm('Are you sure you want to delete this point?') && removePoint(point.id)
            }
          >
            Delete
          </Button>
          <Spacer />
          <Button onClick={onClose}>Close</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default PointModal
