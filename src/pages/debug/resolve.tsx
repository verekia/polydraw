import { useEffect } from 'react'

import resolvedData from '#/lib/resolvedData'

const ResolvePage = () => {
  useEffect(() => {
    resolvedData.superGroups[0].pointGroups[0].points[0].x = 999
    console.log(resolvedData)
  }, [])

  return null
}

export default ResolvePage
