import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: {
      html: { h: 'full' },
      body: { h: 'full', bg: '#1e1e1e', color: 'white' },
      '#__next': { h: 'full' },
    },
  },
})

export default theme
