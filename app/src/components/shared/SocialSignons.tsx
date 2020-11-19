import * as React from 'react'
import { AuthProvider } from '../../integrations/Firebase/Auth'
import Button from './Button'

interface Props {
  handleSocialSignOn: (type: AuthProvider) => (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>
}

export default (props: Props) => (
  <div>
    <Button
      color="btn-outline-secondary"
      size="btn-block"
      leadingIcon="fab fa-google text-success"
      text='Sign In with Google'
      onClick={props.handleSocialSignOn(AuthProvider.Google)}
    />

    <Button
      color="btn-outline-secondary"
      size="btn-block"
      leadingIcon="fab fa-twitter text-info"
      text='Sign In with Twitter'
      onClick={props.handleSocialSignOn(AuthProvider.Twitter)}
    />

    <Button
      color="btn-outline-secondary"
      size="btn-block"
      leadingIcon="fab fa-github"
      text='Sign In with Github'
      onClick={props.handleSocialSignOn(AuthProvider.Github)}
    />
  </div>
)