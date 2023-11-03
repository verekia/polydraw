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

// MdDownload
export const DownloadIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" {...defaultProps} {...props}>
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z" />
  </svg>
)

// MdContentCopy
export const CopyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" {...defaultProps} {...props}>
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
  </svg>
)

// MdOutlineCheck
export const CheckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" {...defaultProps} {...props}>
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
  </svg>
)

// MdOutlineVisibility
export const VisibleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" {...defaultProps} {...props}>
    <path fill="none" d="M0 0h24v24H0V0z" />
    <path d="M12 6a9.77 9.77 0 018.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5A9.77 9.77 0 0112 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5a2.5 2.5 0 010 5 2.5 2.5 0 010-5m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z" />
  </svg>
)

// MdOutlineVisibilityOff
export const HiddenIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" {...defaultProps} {...props}>
    <path fill="none" d="M0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0z" />
    <path d="M12 6a9.77 9.77 0 018.82 5.5 9.647 9.647 0 01-2.41 3.12l1.41 1.41c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l1.65 1.65C10.66 6.09 11.32 6 12 6zm-1.07 1.14L13 9.21c.57.25 1.03.71 1.28 1.28l2.07 2.07c.08-.34.14-.7.14-1.07C16.5 9.01 14.48 7 12 7c-.37 0-.72.05-1.07.14zM2.01 3.87l2.68 2.68A11.738 11.738 0 001 11.5C2.73 15.89 7 19 12 19c1.52 0 2.98-.29 4.32-.82l3.42 3.42 1.41-1.41L3.42 2.45 2.01 3.87zm7.5 7.5l2.61 2.61c-.04.01-.08.02-.12.02a2.5 2.5 0 01-2.5-2.5c0-.05.01-.08.01-.13zm-3.4-3.4l1.75 1.75a4.6 4.6 0 00-.36 1.78 4.507 4.507 0 006.27 4.14l.98.98c-.88.24-1.8.38-2.75.38a9.77 9.77 0 01-8.82-5.5c.7-1.43 1.72-2.61 2.93-3.53z" />
  </svg>
)

// VscInsert
export const InsertIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" {...defaultProps} {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 1L15 2V6L14 7L6 7L5 6L5 2L6 1L14 1ZM14 2L6 2L6 6L14 6L14 2Z"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 9L15 10V14L14 15L6 15L5 14L5 10L6 9L14 9ZM14 10L6 10L6 14L14 14L14 10Z"
    />
    <path d="M1 6.39268L2.61414 8.00682L1 9.62096L1.69352 10.3141L4 8.00682L1.69352 5.69995L1 6.39268Z" />
  </svg>
)
