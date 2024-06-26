import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Textarea,
} from '@chakra-ui/react'

import InlinePoint from '#/components/InlinePoint'
import { DeleteIcon } from '#/lib/icons'
import { useStore } from '#/lib/store'
import { isJSON } from '#/lib/util'

const PointGroupModal = () => {
  const modalShown = useStore(s => s.modalShown)
  const setModalShown = useStore(s => s.setModalShown)
  const selectedPointGroupId = useStore(s => s.selectedPointGroupId)
  const pointGroups = useStore(s => s.pointGroups)
  const pointGroup = pointGroups.find(p => p.id === selectedPointGroupId)
  const updatePointGroup = useStore(s => s.updatePointGroup)
  const removePointGroup = useStore(s => s.removePointGroup)
  const points = useStore(s => s.points)
  const onClose = () => setModalShown()
  const [customDataStr, setCustomDataStr] = useState('')

  const isValidJson = isJSON(customDataStr)
  const hasChanged = isValidJson
    ? JSON.stringify(pointGroup?.data) !== JSON.stringify(JSON.parse(customDataStr))
    : false

  useEffect(() => {
    if (!pointGroup) {
      setModalShown()
    }
  }, [pointGroup, setModalShown])

  if (!pointGroup) {
    return null
  }

  return (
    <Drawer
      placement="right"
      onClose={onClose}
      isOpen={modalShown === 'point-group'}
      preserveScrollBarGap
    >
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Edit point group</DrawerHeader>

        <DrawerBody>
          <Stack>
            <RadioGroup
              onChange={e => updatePointGroup(pointGroup.id, { isPolygon: e === 'true' })}
              value={String(pointGroup.isPolygon)}
            >
              <Stack direction="row">
                <Radio value="true">Polygon</Radio>
                <Radio value="false">Disconnected points</Radio>
              </Stack>
            </RadioGroup>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={pointGroup.name}
                onChange={e =>
                  updatePointGroup(pointGroup.id, { name: e.target.value || undefined })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Color</FormLabel>
              <Input
                type="text"
                value={pointGroup.color}
                onChange={e =>
                  updatePointGroup(pointGroup.id, { color: e.target.value || undefined })
                }
              />
              <Input
                type="color"
                value={pointGroup.color ?? '#000000'}
                onChange={e =>
                  updatePointGroup(pointGroup.id, { color: e.target.value || undefined })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>
                Custom Data{' '}
                <Box as="span" fontWeight="normal" color="#aaa" ml={2}>
                  (use valid JSON)
                </Box>
              </FormLabel>
              <Textarea
                placeholder={`{
  "foo": "bar"
}`}
                value={customDataStr}
                minH="124px"
                onChange={e => setCustomDataStr(e.target.value)}
              />
              <Flex>
                <Spacer />
                <Button
                  mt={2}
                  isDisabled={
                    (customDataStr.length > 0 && (!isValidJson || !hasChanged)) ||
                    (customDataStr === '' && !pointGroup.data)
                  }
                  onClick={() => {
                    if (customDataStr === '') {
                      updatePointGroup(pointGroup.id, { data: undefined })
                      return
                    }
                    if (isValidJson && hasChanged && isJSON(customDataStr)) {
                      updatePointGroup(pointGroup.id, { data: JSON.parse(customDataStr) })
                    }
                  }}
                >
                  {customDataStr === '' && pointGroup.data
                    ? 'Save'
                    : (isValidJson && !hasChanged) || (customDataStr === '' && !pointGroup.data)
                    ? 'Saved, no change'
                    : !isValidJson
                    ? 'Invalid JSON'
                    : 'Save'}
                </Button>
              </Flex>
            </FormControl>
          </Stack>
          <Box mt={5}>
            <FormLabel mb={2}>Points</FormLabel>
            <Stack>
              {pointGroup.pointIds.map(pid => {
                const foundPoint = points.find(p => p.id === pid)
                if (!foundPoint) {
                  return null
                }
                return <InlinePoint key={pid} {...foundPoint} pointGroupId={pointGroup.id} />
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
                'Are you sure you want to delete this point group? The points it references will not be deleted.',
              ) && removePointGroup(pointGroup.id)
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

export default PointGroupModal
