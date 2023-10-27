import { Flex } from '@chakra-ui/react'

import Pane from '#/components/Pane'
import Workspace from '#/components/Workspace'

const IndexPage = () => (
  <Flex boxSize="full" justifyContent="center">
    <Workspace flexGrow={1} />
    <Pane h="full" w="full" maxW="300px" minW="200px" />
  </Flex>
)

export default IndexPage
