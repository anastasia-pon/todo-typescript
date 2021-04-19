import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';

interface Credentials {
  username: string;
  password: string;
}

const SignInForm = () => {
  const { oktaAuth } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState<string | undefined>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const credentials: Credentials = {
      username: email,
      password,
    };
    oktaAuth.signInWithCredentials(credentials)
      .then(res => {
        setSessionToken(res.sessionToken);
        // sessionToken is a one-use token, so make sure this is only called once
        oktaAuth.signInWithRedirect({ sessionToken: res.sessionToken });
      })
      .catch(err => console.log('Found an error', err));
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  if (sessionToken) {
    // Hide form while sessionToken is converted into id/access tokens
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">
        Email:
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleUsernameChange}
        />
      </label>
      <label htmlFor="password">
        Password:
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <input id="submit" type="submit" value="Submit" />
    </form>
  );
};
export default SignInForm;
