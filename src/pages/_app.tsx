import { ChakraProvider } from '@chakra-ui/react'
import PlausibleProvider from 'next-plausible'

import theme from '#/styles/theme'

import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => (
  <PlausibleProvider
    domain="polydraw.app"
    trackOutboundLinks
    selfHosted
    customDomain="https://pl.v1v2.io"
  >
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  </PlausibleProvider>
)

export default App
