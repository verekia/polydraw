import { Flex } from '@chakra-ui/react'

import Pane from '#/components/Pane'
import Workspace from '#/components/Workspace'

const IndexPage = () => (
  <Flex boxSize="full" justifyContent="center">
    <Workspace flexGrow={1} />
    <Pane h="full" w="full" maxW="700px" minW="200px" overflowY="scroll" />
  </Flex>
)

export default IndexPage
