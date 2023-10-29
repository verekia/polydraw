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

// MdOutlineHelpOutline
export const HelpIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" {...defaultProps} {...props}>
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
  </svg>
)

// MdOutlineEdit
export const EditIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" {...defaultProps} {...props}>
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83a.996.996 0 000-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z" />
  </svg>
)

// MdOutlinePlaylistAdd
export const AddListIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" {...defaultProps} {...props}>
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M14 10H3v2h11v-2zm0-4H3v2h11V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM3 16h7v-2H3v2z" />
  </svg>
)

// MdOutlinePlaylistRemove
export const RemoveListIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" {...defaultProps} {...props}>
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M14 10H3v2h11v-2zm0-4H3v2h11V6zM3 16h7v-2H3v2zm11.41 6L17 19.41 19.59 22 21 20.59 18.41 18 21 15.41 19.59 14 17 16.59 14.41 14 13 15.41 15.59 18 13 20.59 14.41 22z" />
  </svg>
)

// MdAddIcon
export const AddIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" {...defaultProps} {...props}>
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
)
