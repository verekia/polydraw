export const truncateDecimals = (num: number, digits: number) => {
  const factor = Math.pow(10, digits)
  return Math.round(num * factor) / factor
}

export const isJSON = (str: string) => {
  try {
    const obj = JSON.parse(str)
    return !!obj && typeof obj === 'object'
  } catch (e) {
    return false
  }
}
