import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import Home from './views/Home';
import SignIn from './components/SignIn';
import SignUp from './views/SignUpForm';
import Protected from './Protected';
import CreateList from './views/CreateList';

interface OktaAuthType {
  issuer: string;
  clientId: string;
  redirectUri: string;
  onAuthRequired: () => void;
  pkce: boolean;
}

const AppWithRouterAccess = () => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push('/login');
  };
  const OktaAuthObj: OktaAuthType = {
    issuer: 'https://dev-34125052.okta.com/oauth2/default',
    clientId: '0oalwdz3sZLWSGoxd5d6',
    redirectUri: `${window.location.origin}/login/callback`,
    onAuthRequired,
    pkce: true,
  };

  const oktaAuth = new OktaAuth(OktaAuthObj);
  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri, window.location.origin));
  };

  return (
    <Security
      oktaAuth={oktaAuth}
      restoreOriginalUri={restoreOriginalUri}
      onAuthRequired={onAuthRequired}
    >
      <SecureRoute path='/' exact component={Home} />
      <SecureRoute path='/create' component={CreateList} />
      <SecureRoute path='/protected' component={Protected} />
      <Route path='/login' render={() => <SignIn />} />
      <Route path='/login/callback' component={LoginCallback} />
      <Route path='/signup' render={() => <SignUp />} />
    </Security>
  );
};

export default AppWithRouterAccess;
