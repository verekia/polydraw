import { Center, CenterProps } from '@chakra-ui/react'

import Canvas from '#/components/Canvas'

const Workspace = (centerProps: CenterProps) => (
  <Center h="full" {...centerProps}>
    <Canvas />
  </Center>
)

export default Workspace
