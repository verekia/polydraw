import type { SVGProps } from 'react'

const defaultProps = {
  stroke: 'currentColor',
  height: '1em',
  width: '1em',
  // 'aria-hidden': 'true',
  // focusable: 'false',
  // Maybe add fill and stokeWidth?
}

// MdDelete
export const DeleteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" {...defaultProps} {...props}>
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </svg>
)

// MdArrowDownward
export const DownArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" {...defaultProps} {...props}>
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
  </svg>
)

// MdArrowUpward
export const UpArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" {...defaultProps} {...props}>
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
  </svg>
)
