import * as React from 'react'

interface Props {
  color: string
  text: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  size?: string
  leadingIcon?: string  
  disabled?: boolean
}

export default (props: Props) => {
  const className = [
    'btn',
    props.color,
    props.size || '',
  ].join(' ')

  return (
    <button
      className={className}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      { props.leadingIcon && <i className={props.leadingIcon} /> }
      { props.leadingIcon && ' ' }
      { props.text }
    </button>
  )
}