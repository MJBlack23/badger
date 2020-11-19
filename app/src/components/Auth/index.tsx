import * as React from 'react'
import { AuthProvider } from '../../integrations/Firebase/Auth'

import ForgotPassword from './ForgotPassword'
import SignIn from './SignIn'
import SignUp from './SignUp'

export enum AuthScreen {
  Signin = 'signin',
  Signup = 'signup',
  ResetPassword = 'resetPassword'
}

type EmailAuth = (email: string, password: string) => Promise<string>

interface Props {
  createUser: EmailAuth
  emailSignIn: EmailAuth
  providerSignIn: (provider: AuthProvider) => (e: React.MouseEvent<HTMLInputElement>) => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

export default (props: Props) => {
  const [ authScreen, setAuthScreen ] = React.useState(AuthScreen.Signin)
  const handleToggleSignup = (nextScreen: AuthScreen): (e: React.MouseEvent<HTMLButtonElement>) => void =>
    e => {
      e.preventDefault()

      setAuthScreen(nextScreen)
    }

  const renderAuthScreen = (): JSX.Element => {
    switch (authScreen) {
      case AuthScreen.Signin:
        return (
          <SignIn
            handleShowSignUp={handleToggleSignup(AuthScreen.Signup)}
            handleShowForgotPassword={handleToggleSignup(AuthScreen.ResetPassword)}
            signInWithEmail={props.emailSignIn}
            providerSignIn={props.providerSignIn}
          />
        )
      case AuthScreen.Signup:
        return (
          <SignUp
            handleShowSignIn={handleToggleSignup(AuthScreen.Signin)}
            handleShowForgotPassword={handleToggleSignup(AuthScreen.ResetPassword)}
            createUser={props.createUser}
            providerSignIn={props.providerSignIn}
          />
        )
      case AuthScreen.ResetPassword:
        return (
          <ForgotPassword
            handleShowSignIn={handleToggleSignup(AuthScreen.Signin)}
            handleResetPassword={props.resetPassword}
          />
        )
    }
  }

  return (
    <div
      style={styles.container}
      className="d-flex justify-content-center align-items-center"
    >
      { renderAuthScreen() }
    </div>
  )
}

const styles = {
  container: {
    backgroundColor: '#E6E6E6',
    height: '100vh',
  }
}