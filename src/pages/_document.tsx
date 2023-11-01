import { HeadCosmetics } from '@v1v2/react'
import { Head, Html, Main, NextScript } from 'next/document'

const title = 'PolyDraw | Draw Polygons, Export Coordinates'
const description = 'Draw polygons and extract their coordinates into JSON files.'
const img = 'https://polydraw.app/og.png'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <HeadCosmetics themeColor="#ff3333" iconSvg={false} />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://polydraw.app" />
        <meta property="og:site_name" content="PolyDraw" />
        <meta property="og:image" content={img} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@verekia" />
        <meta name="twitter:site:id" content="218109618" />
        <meta name="twitter:creator" content="@verekia" />
        <meta name="twitter:creator:id" content="218109618" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={img} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
