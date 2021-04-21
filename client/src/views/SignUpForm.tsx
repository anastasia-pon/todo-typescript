/* eslint-disable max-len */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { createNewUser } from '../modules/api';
import Error from '../components/Error';

const SignUp = () => {
  const { oktaAuth } = useOktaAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [matchPasswords, setMatchPasswords] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value);
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMatchPasswords(false);
    } else {
      const newUser = {
        firstName,
        lastName,
        email,
        password,
      };
      const response = await createNewUser(newUser);
      if (!response.ok) {
        setError(true);
        return setErrorMessage('Registration failed');
      }
      try {
        const transaction = await oktaAuth.signIn({
          username: newUser.email,
          password: newUser.password,
        });
        if (transaction.status === 'SUCCESS') {
          oktaAuth.signInWithRedirect({
            originalUri: '/',
            sessionToken: transaction.sessionToken,
          });
          setError(false);
        } else {
          setError(true);
          setErrorMessage('Login failed');
        }
      } catch (err) {
        setError(true);
        setErrorMessage(err.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="firstName">
        First Name:
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={handleFirstNameChange}
          required
        />
      </label>
      <label htmlFor="lastName">
        Last Name:
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={handleLastNameChange}
          required
        />
      </label>
      <label htmlFor="email">
        Email:
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </label>
      <label htmlFor="password">
        Password:
        <input
          id="password"
          type="password"
          value={password}
          pattern="^.{8,}$"
          onChange={handlePasswordChange}
          required
        />
        Must be at least 8 characters long
      </label>
      <label htmlFor="confirmPassword">
        Confirm Password:
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />
      </label>
      {!matchPasswords && <p>Passwords do not match</p>}
      <input id="submit" type="submit" value="Submit" />
      {error && <Error setError={setError} errorMessage={errorMessage} />}
    </form>
  );
};
export default SignUp;
