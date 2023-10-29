import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      html: { h: 'full', WebkitTapHighlightColor: 'transparent', overflowX: 'hidden' },
      body: { h: 'full', bg: '#1e1e1e', color: 'white' },
      '#__next': { h: 'full' },
      '.chakra-slide': { bg: '#333 !important' },
    },
  },
})

export default theme
