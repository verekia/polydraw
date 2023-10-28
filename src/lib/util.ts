export const truncateDecimals = (num: number, digits: number = 5) => {
  const multiplier = Math.pow(10, digits)
  const adjustedNum = num * multiplier
  const truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum)
  return truncatedNum / multiplier
}
