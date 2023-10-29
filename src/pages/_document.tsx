import { HeadCosmetics } from '@v1v2/react'
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <HeadCosmetics themeColor="#ff3333" iconSvg={false} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
