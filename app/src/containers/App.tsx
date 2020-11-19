import * as React from 'react'
import * as Firebase from '../integrations/Firebase'
import AuthContainer from '../components/Auth'

const Auth = Firebase.Auth.default

interface Props {

}

export default (props: Props) => {
  const [ user, setUser ] = React.useState<Firebase.Auth.User>(null)

  const handleAuthState = (user: Firebase.Auth.User) => {
    setUser(user)
  }

  Auth.setupAuthListener(handleAuthState)

  if (!user) {
    return (
      <AuthContainer
        createUser={Auth.createUserWithEmailAndPassword}
        emailSignIn={Auth.signInWithEmailAndPassword}
        providerSignIn={Auth.signInWithProvider}
        resetPassword={Auth.resetPassword}
      />
    )
  }

  return (
    <div>
      Logged in!

      <button onClick={() => Auth.signOut()}>Sign Out</button>
    </div>
  )
}