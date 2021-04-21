import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  // const { userData, setUserData } = useState();
  const history = useHistory();
  console.log(authState);

  if (authState.isPending) {
    return <div>Loading...</div>;
  }

  const button = authState.isAuthenticated
    ? <button type="button" onClick={() => { oktaAuth.signOut(); }}>Logout</button>
    : <button type="button" onClick={() => { history.push('/login'); }}>Login</button>;

  return (
    <div>
      <Link to='/'>Home</Link>
      <br />
      <Link to='/protected'>Protected</Link>
      <br />
      {button}
    </div>
  );
};
export default Home;
