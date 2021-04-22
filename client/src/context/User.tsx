import React, { createContext } from 'react';
import { useOktaAuth } from '@okta/okta-react';

export const GeneralContext = createContext();

export const GeneralProvider = props => {
  const { children } = props;
  const { authState, oktaAuth } = useOktaAuth();

  return (
    <GeneralContext.Provider value={{}}>
      {children}
    </GeneralContext.Provider>
  );
};
