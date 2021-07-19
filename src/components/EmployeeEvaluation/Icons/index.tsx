import React from 'react'

export const CommentEmpty = ({ fill }: { fill: string }) => (
  <svg
    data-cy="comment"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    fillOpacity="0.8"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19.99 2C19.99 0.9 19.1 0 18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H16L20 20L19.99 2ZM18 2V15.17L16.83 14H2V2H18Z"
      fill={fill}
    />
  </svg>
)

export const CommentFill = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    data-cy="fillComment"
  >
    <path
      d="M19.99 2C19.99 0.9 19.1 0 18 0H2C0.9 0 0 0.9 0 2V14C0 15.1 0.9 16 2 16H16L20 20L19.99 2ZM18 2V15.17L16.83 14H2V2H18Z"
      fill="gray"
      fillOpacity="0.8"
    />
    <path d="M16 10H4V12H16V10Z" fill="gray" fillOpacity="0.8" />
    <path d="M16 7H4V9H16V7Z" fill="gray" fillOpacity="0.8" />
    <path d="M16 4H4V6H16V4Z" fill="gray" fillOpacity="0.8" />
  </svg>
)
