import * as React from 'react';
import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

const Nav: React.FC = () => {
  // const history = useHistory();
  const { authState, oktaAuth } = useOktaAuth();
  // const button = authState.isAuthenticated
  //   ? <button type="button" onClick={() => { oktaAuth.signOut(); }}>Logout</button>
  //   : <button type="button" onClick={() => { history.push('/login'); }}>Login</button>;

  return (
    <header>
      <nav>
        <div className="container">
          {authState.isAuthenticated && (
            <>
              <Link to="/">Home</Link>
              <button type="button" onClick={() => { oktaAuth.signOut(); }}>Logout</button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
