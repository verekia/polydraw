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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Spacer,
  Stack,
  Textarea,
} from '@chakra-ui/react'

import { DeleteIcon } from '#/lib/icons'
import { useStore } from '#/lib/store'
import { isJSON, truncateDecimals } from '#/lib/util'

const PointModal = () => {
  const modalShown = useStore(s => s.modalShown)
  const setModalShown = useStore(s => s.setModalShown)
  const selectedPointId = useStore(s => s.selectedPointId)
  const points = useStore(s => s.points)
  const point = points.find(p => p.id === selectedPointId)
  const [xStringValue, setXStringValue] = useState('')
  const [yStringValue, setYStringValue] = useState('')
  const [zStringValue, setZStringValue] = useState('')
  const [rotZStringValue, setRotZStringValue] = useState('')
  const updatePoint = useStore(s => s.updatePoint)
  const removePoint = useStore(s => s.removePoint)
  const decimals = useStore(s => s.decimals)
  const onClose = () => setModalShown()
  const [customDataStr, setCustomDataStr] = useState('')

  const isValidJson = isJSON(customDataStr)
  const hasChanged = isValidJson
    ? JSON.stringify(point?.data) !== JSON.stringify(JSON.parse(customDataStr))
    : false

  useEffect(() => {
    if (point?.x !== undefined) {
      setXStringValue(String(truncateDecimals(point.x, decimals)))
    } else {
      setXStringValue('')
    }
  }, [point, point?.x, decimals])

  useEffect(() => {
    if (point?.y !== undefined) {
      setYStringValue(String(truncateDecimals(point.y, decimals)))
    } else {
      setYStringValue('')
    }
  }, [point, point?.y, decimals])

  useEffect(() => {
    if (point?.z !== undefined) {
      setZStringValue(String(truncateDecimals(point.z, decimals)))
    } else {
      setZStringValue('')
    }
  }, [point, point?.z, decimals])

  useEffect(() => {
    if (point?.rotZ !== undefined) {
      setRotZStringValue(String(truncateDecimals(point.rotZ, decimals)))
    } else {
      setRotZStringValue('')
    }
  }, [point, point?.rotZ, decimals])

  useEffect(() => {
    if (point?.data !== undefined) {
      setCustomDataStr(JSON.stringify(point.data, null, 2))
    } else {
      setCustomDataStr('')
    }
  }, [point, point?.data])

  useEffect(() => {
    if (!point) {
      setModalShown()
    }
  }, [point, setModalShown])

  if (!point) {
    return null
  }

  return (
    <Drawer
      placement="right"
      onClose={onClose}
      isOpen={modalShown === 'point'}
      preserveScrollBarGap
    >
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
              <NumberInput
                value={xStringValue}
                onChange={val => {
                  if (val === '') {
                    updatePoint(point.id, { x: undefined })
                    setXStringValue('')
                    return
                  }
                  setXStringValue(val)
                  updatePoint(point.id, { x: Number(val) })
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Y</FormLabel>
              <NumberInput
                value={yStringValue}
                onChange={val => {
                  if (val === '') {
                    updatePoint(point.id, { y: undefined })
                    setYStringValue('')
                    return
                  }
                  setYStringValue(val)
                  updatePoint(point.id, { y: Number(val) })
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
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
            <FormControl>
              <FormLabel>
                Z
                <Box as="span" fontWeight="normal" color="#aaa" ml={2}>
                  (not represented)
                </Box>
              </FormLabel>
              <NumberInput
                value={zStringValue}
                onChange={val => {
                  if (val === '') {
                    updatePoint(point.id, { z: undefined })
                    setZStringValue('')
                    return
                  }
                  setZStringValue(val)
                  updatePoint(point.id, { z: Number(val) })
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>
                Z rotation
                <Box as="span" fontWeight="normal" color="#aaa" ml={2}>
                  (degrees)
                </Box>
              </FormLabel>
              <NumberInput
                value={rotZStringValue}
                onChange={val => {
                  if (val === '') {
                    updatePoint(point.id, { rotZ: undefined })
                    // setIsRotZInputMounted(false)
                    setRotZStringValue('')
                    return
                  }
                  setRotZStringValue(val)
                  updatePoint(point.id, { rotZ: Number(val) })
                }}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
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
                    (customDataStr === '' && !point.data)
                  }
                  onClick={() => {
                    if (customDataStr === '') {
                      updatePoint(point.id, { data: undefined })
                      return
                    }
                    if (isValidJson && hasChanged && isJSON(customDataStr)) {
                      updatePoint(point.id, { data: JSON.parse(customDataStr) })
                    }
                  }}
                >
                  {customDataStr === '' && point.data
                    ? 'Save'
                    : (isValidJson && !hasChanged) || (customDataStr === '' && !point.data)
                    ? 'Saved, no change'
                    : !isValidJson
                    ? 'Invalid JSON'
                    : 'Save'}
                </Button>
              </Flex>
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
