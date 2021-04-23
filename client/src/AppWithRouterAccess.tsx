import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';

import { AllListsProvider } from './context/AllListsContext';

import Home from './views/Home';
import List from './views/List';
import Nav from './components/Nav/Nav';
import SignIn from './components/SignIn';
import SignUp from './views/SignUpForm';
import Protected from './Protected';
import CreateList from './views/CreateList';

const AppWithRouterAccess: React.FC = () => {
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
      <Nav />
      <AllListsProvider>
        <SecureRoute path="/" exact component={Home} />
        <SecureRoute path="/create" component={CreateList} />
      </AllListsProvider>
      <SecureRoute path="/protected" component={Protected} />
      <Route path="/list/:idParam" component={List} />
      <Route path="/login" render={() => <SignIn />} />
      <Route path="/login/callback" component={LoginCallback} />
      <Route path="/signup" render={() => <SignUp />} />
    </Security>
  );
};

export default AppWithRouterAccess;
