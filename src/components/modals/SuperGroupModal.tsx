import { useEffect } from 'react'

import {
  Box,
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

import InlinePointGroup from '#/components/InlinePointGroup'
import { DeleteIcon } from '#/lib/icons'
import { useStore } from '#/lib/store'

const SuperGroupModal = () => {
  const modalShown = useStore(s => s.modalShown)
  const setModalShown = useStore(s => s.setModalShown)
  const selectedSuperGroupId = useStore(s => s.selectedSuperGroupId)
  const superGroups = useStore(s => s.superGroups)
  const superGroup = superGroups.find(p => p.id === selectedSuperGroupId)
  const updateSuperGroup = useStore(s => s.updateSuperGroup)
  const removeSuperGroup = useStore(s => s.removeSuperGroup)
  const pointGroups = useStore(s => s.pointGroups)
  const onClose = () => setModalShown()

  useEffect(() => {
    if (!superGroup) {
      setModalShown()
    }
  }, [superGroup, setModalShown])

  if (!superGroup) {
    return null
  }

  return (
    <Drawer
      placement="right"
      onClose={onClose}
      isOpen={modalShown === 'super-group'}
      preserveScrollBarGap
    >
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Edit super group</DrawerHeader>

        <DrawerBody>
          <Stack>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={superGroup.name}
                onChange={e =>
                  updateSuperGroup(superGroup.id, { name: e.target.value || undefined })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Color</FormLabel>
              <Input
                type="text"
                value={superGroup.color}
                onChange={e =>
                  updateSuperGroup(superGroup.id, { color: e.target.value || undefined })
                }
              />
              <Input
                type="color"
                value={superGroup.color ?? '#000000'}
                onChange={e =>
                  updateSuperGroup(superGroup.id, { color: e.target.value || undefined })
                }
              />
            </FormControl>
          </Stack>
          <Box mt={5}>
            <FormLabel mb={2}>Points</FormLabel>
            <Stack>
              {superGroup.pointGroupIds.map(pid => {
                const foundPointGroup = pointGroups.find(p => p.id === pid)
                if (!foundPointGroup) {
                  return null
                }
                return (
                  <InlinePointGroup key={pid} {...foundPointGroup} superGroupId={superGroup.id} />
                )
              })}
            </Stack>
          </Box>
        </DrawerBody>

        <DrawerFooter>
          <Button
            colorScheme="red"
            variant="ghost"
            leftIcon={<Icon as={DeleteIcon} />}
            onClick={() =>
              confirm(
                'Are you sure you want to delete this super group? The point groups it references will not be deleted.',
              ) && removeSuperGroup(superGroup.id)
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

export default SuperGroupModal
