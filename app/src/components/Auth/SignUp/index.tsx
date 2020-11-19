import * as React from 'react'
import { AuthProvider } from '../../../integrations/Firebase/Auth'
import { initialState, reducer } from './reducer'

import Button from '../../shared/Button'
import CenteredContainer from '../../shared/CenteredContainer'
import Input, { InputType } from '../../shared/Input'

interface Props {
  handleShowSignIn: (e: React.MouseEvent<HTMLButtonElement>) => void
  handleShowForgotPassword: (e: React.MouseEvent<HTMLButtonElement>) => void
  createUser: (email: string, password: string) => Promise<string>
  providerSignIn: (email: AuthProvider) => (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>
}

export default (props: Props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  const handleEmailUpdate = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'emailUpdate', payload: e.target.value })
  const handlePasswordUpdate = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'passwordUpdate', payload: e.target.value })
  const handleConfirmPasswordUpdate = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'confirmPasswordUpdate', payload: e.target.value })
  const toggleShowPassword = (confirm: boolean): (e: React.MouseEvent<HTMLButtonElement>) => void =>
    e => confirm ? dispatch({ type: 'toggleConfirmPassword' }) : dispatch({ type: 'togglePassword' })

  const isValid = () => state.email.isValid && state.password.isValid && state.confirmPassword.isValid

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isValid()) {
      dispatch({ type: 'isLoading' })
      props.createUser(state.email.value, state.password.value)
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
      label="Create a new Account"
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
            !state.email.isValid && state.email.value.length > 0 ?
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
          type={state.password.hidePassword ? InputType.Password : InputType.Text}
          isValid={state.password.isValid}
          isTouched={state.password.isTouched}
          helpText={
            !state.password.isValid && state.password.value.length > 0 ?
              'Password is not Valid. Must be > 8 characters' :
              ''
          }
          helpTextColor='text-danger'
          trailingIcon={
            <button className="btn btn-outline-secondary" onClick={toggleShowPassword(false)}>
              {
                state.password.hidePassword ?
                  <i className="far fa-eye" /> :
                  <i className="far fa-eye-slash" />
              }
            </button>
          }
        />

        <Input
          label='Confirm Password'
          name='confirmPassword'
          value={state.confirmPassword.value}
          onChange={handleConfirmPasswordUpdate}
          type={state.confirmPassword.hidePassword ? InputType.Password : InputType.Text}
          isValid={state.confirmPassword.isValid}
          isTouched={state.confirmPassword.isTouched}
          helpTextColor='text-danger'
          helpText={
            !state.confirmPassword.isValid && state.confirmPassword.value.length > 0 ?
              'Passwords do not match' :
              ''
          }
          trailingIcon={
            <button className="btn btn-outline-secondary" onClick={toggleShowPassword(true)}>
              {
                state.confirmPassword.hidePassword ?
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
              text="Already have an Account?"
              onClick={props.handleShowSignIn}
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
              value="Create Account"
              className="btn btn-success float-right"
              disabled={!isValid()}
            />
          </div>
        </div>

      </form>
    </CenteredContainer>
  )
}