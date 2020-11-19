import * as React from 'react'
import { AuthProvider } from '../../../integrations/Firebase/Auth'
import { initialState, reducer } from './reducer'

import Button from '../../shared/Button'
import CenteredContainer from '../../shared/CenteredContainer'
import Input, { InputType } from '../../shared/Input'

interface Props {
  handleShowSignUp: (e: React.MouseEvent<HTMLButtonElement>) => void
  handleShowForgotPassword: (e: React.MouseEvent<HTMLButtonElement>) => void
  signInWithEmail: (email: string, password: string) => Promise<string>
  providerSignIn: (email: AuthProvider) => (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>
}

export default (props: Props) => {
  const [ hidePassword, setHidePassword ] = React.useState(true)
  const [ state, dispatch ] = React.useReducer(reducer, initialState)

  const handleEmailUpdate = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'emailUpdate', payload: e.target.value })
  const handlePasswordUpdate = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'passwordUpdate', payload: e.target.value })


  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault()

    if (state.email.isValid) {
      dispatch({ type: 'isLoading' })
      props.signInWithEmail(state.email.value, state.password.value)
        .then(() => {
          dispatch({ type: 'success' })
        })
        .catch(e => {
          dispatch({ type: 'error', payload: e.message })
        })
    }
  }

  return (
    <CenteredContainer
      label="Sign in"
    >
      <form
        onSubmit={handleSubmit}
      >
        {
          state.message.value.length > 0 &&
            <div className={`alert ${state.message.type === 'error' ? 'alert-danger' : 'alert-info'}`} role="alert">
              {state.message.value}
            </div>
        }
        
        <Input
          label='Email Address'
          name='email'
          value={state.email.value}
          onChange={handleEmailUpdate}
          type={InputType.Email}
          isValid={state.email.isValid}
          isTouched={state.email.isTouched}
          helpText={
            !state.email.isValid && state.email.isTouched ?
              'Email is not Valid' :
              ''
          }
          helpTextColor='text-danger'
        />

        <Input
          label='Password'
          name='password'
          value={state.password.value}
          onChange={handlePasswordUpdate}
          type={hidePassword ? InputType.Password : InputType.Text}
          trailingIcon={
            <button className="btn btn-outline-secondary" onClick={() => setHidePassword(!hidePassword)}>
              {
                hidePassword ?
                  <i className="far fa-eye" /> :
                  <i className="far fa-eye-slash" />
              }
            </button>
          }
        />

        <div className="row">
          <div className="col">
            <Button
              color="btn-link"
              text="Create a new account"
              onClick={props.handleShowSignUp}
            />
          </div>

          <div className="col">
            <Button
              color="btn-link"
              text="Forgot your password?"
              onClick={props.handleShowForgotPassword}
            />
          </div>

          <div className="col">
            <input
              type="submit"
              value="Sign In"
              className="btn btn-success float-right"
              disabled={!state.email.isValid}
            />
          </div>
        </div>

      </form>
    </CenteredContainer>
  )
}