import * as React from 'react'
import CenteredContainer from '../shared/CenteredContainer'
import Input, { InputType } from '../shared/Input'
import Button from '../shared/Button'

import { validateEmail } from '../../util/'

interface Props {
  handleShowSignIn: (e: React.MouseEvent<HTMLButtonElement>) => void
  handleResetPassword: (email: string) => Promise<void>
}

export default (props: Props) => {
  const [ email, setEmail ] = React.useState('')
  const [ emailIsValid, setEmailIsValid ] = React.useState(false)
  const [ message, setMessage ] = React.useState('')

  const handleSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)

    setEmailIsValid(validateEmail(e.target.value))
  }

  const handleResetPassword = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    setMessage('Sending password reset email...')

    props.handleResetPassword(email)
      .then(() => {
        // @ts-ignore
        props.handleShowSignIn()
      })
      .catch(e => {
        setMessage(e.message)
      })
  }

  return (
    <CenteredContainer label="Forgot Your Password?">
      <form
        onSubmit={handleResetPassword}
      >
        <Input
          label="Email Address"
          name="email"
          value={email}
          onChange={handleSetEmail}
          type={InputType.Email}
          helpText={message}
        />

        <div className="row">
          <div className="col">
            <Button
              color="btn-link float-right"
              text="Return to Sign In"
              onClick={props.handleShowSignIn}
            />
          </div>
        </div>

        <input
          type="submit"
          className="btn btn-success btn-block"
          value="Reset Password"
          disabled={!emailIsValid}
        />
      </form>
    </CenteredContainer>
  )
}