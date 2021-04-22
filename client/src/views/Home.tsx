import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

import { TodoList } from '../types/types';

import { getAllLists } from '../modules/api';

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [todoLists, setTodosLists] = useState<TodoList[]>([]);
  const history = useHistory();

  if (authState.isPending) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    const token = authState.accessToken;
    if (todoLists.length === 0 && token?.claims.cid) {
      const fetchData = async () => {
        const response = await getAllLists(token?.claims.cid, token?.accessToken);
        const allBoxesJson = await response.json();
        setTodosLists(allBoxesJson);
      };
      fetchData();
    }
  }, [authState]);

  const button = authState.isAuthenticated
    ? <button type="button" onClick={() => { oktaAuth.signOut(); }}>Logout</button>
    : <button type="button" onClick={() => { history.push('/login'); }}>Login</button>;

  return (
    <div>
      {button}
      {todoLists.length === 0 && <p>There are no ToDo lists yet.</p>}
      <button type="button" onClick={() => { history.push('/create'); }}>Create a List</button>
    </div>
  );
};
export default Home;
