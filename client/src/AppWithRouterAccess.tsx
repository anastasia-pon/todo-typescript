import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import Home from './views/Home';
import SignIn from './components/SignIn';
import Protected from './Protected';

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
    issuer: 'https://dev-53278354.okta.com/oauth2/default',
    clientId: '0oaktwksi4dzeIgCj5d6',
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
      <Route path='/' exact component={Home} />
      <SecureRoute path='/protected' component={Protected} />
      <Route path='/login' render={() => <SignIn />} />
      <Route path='/login/callback' component={LoginCallback} />
    </Security>
  );
};

export default AppWithRouterAccess;
