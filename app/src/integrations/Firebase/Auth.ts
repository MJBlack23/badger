import firebase from 'firebase'

export type HandleAuthStateChanged = (user: firebase.User) => void

export enum AuthProvider {
  Google = 'google',
  Twitter = 'twitter',
  Github = 'github',
}

export type User = firebase.User

export default class Auth {
  static setupAuthListener = (handler: HandleAuthStateChanged) => {
    firebase.auth().onAuthStateChanged(handler)
  }

  static createUserWithEmailAndPassword = (email: string, password: string): Promise<string> =>
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(result => result.user.uid)

  static signInWithEmailAndPassword = (email: string, password: string): Promise<string> =>
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(result => result.user.uid)

  static signInWithProvider = (provider: AuthProvider): (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> =>
    e => firebase.auth().signInWithRedirect(Auth.selectProvider(provider))

  static signOut = (): Promise<void> => firebase.auth().signOut()

  static resetPassword = (email: string): Promise<void> =>
    firebase.auth().sendPasswordResetEmail(email)

  private static selectProvider = (provider: AuthProvider): firebase.auth.AuthProvider => {
    switch (provider) {
      case AuthProvider.Google:
        return new firebase.auth.GoogleAuthProvider()
      case AuthProvider.Twitter:
        return new firebase.auth.TwitterAuthProvider()
      case AuthProvider.Github:
        return new firebase.auth.GithubAuthProvider()
    }
  }
}