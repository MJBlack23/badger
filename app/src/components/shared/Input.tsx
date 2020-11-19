import * as React from 'react'

export enum InputType {
  Email = 'email',
  Password = 'password',
  Text = 'text',
  Submit = 'submit',
}

interface Props {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isValid?: boolean
  isTouched?: boolean
  type?: InputType
  helpText?: string
  helpTextColor?: string
  trailingIcon?: JSX.Element
}

export default (props: Props) => {
  const inputType = props.type ? props.type : InputType.Text
  const helpTextColor = props.helpTextColor ? props.helpTextColor : 'text-muted'
  const inputColor = (() => {
    if (props.isValid && props.isTouched) {
      return 'is-valid'
    } else if (!props.isValid && props.isTouched) {
      return 'is-invalid'
    }
    return ''
  })()

  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <div className="input-group mb-3">
        <input
          type={inputType}
          className={`form-control ${inputColor}`}
          name={props.name}
          onChange={props.onChange}
          aria-describedby="emailHelp"
        />
        {
          props.trailingIcon &&
          <div className="input-group-append">
            {props.trailingIcon}
          </div>
        }
      </div>
      {
        props.helpText &&
        <small
          className={`form-text ${helpTextColor}`}
        >
          {props.helpText}
        </small>
      }
    </div>
  )
}