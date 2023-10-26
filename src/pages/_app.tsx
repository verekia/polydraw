import { ChakraProvider } from '@chakra-ui/react'

import theme from '#/styles/theme'

import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider theme={theme}>
    <Component {...pageProps} />
  </ChakraProvider>
)

export default App
