/* eslint-disable max-len */
import * as React from 'react';
import { createContext, useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';

import { getAllLists } from '../modules/api';

const AllListsContextDefault: AllListsContextState = {
  lists: [],
  userData: [],
  fetchLists: () => {},
  // createList: () => {},
  // deleteList: () => {}
};

export const AllListsContext = createContext<AllListsContextState>(AllListsContextDefault);

export const AllListsProvider: React.FC = ({ children }) => {
  // const { children } = props;
  const { authState, oktaAuth } = useOktaAuth();
  const [userData, setUserData] = useState<string[]>(AllListsContextDefault.userData!);

  useEffect(() => (authState.isAuthenticated ? setUserData([authState.accessToken!.claims.cid, authState.accessToken!.accessToken]) : setUserData([])), [authState, oktaAuth]);

  const [lists, setLists] = useState<ListState[]>(AllListsContextDefault.lists);
  console.log(authState.isAuthenticated, 'isAuthenticated');
  const fetchLists = async () => {
    console.log('fetching lists');
    const response = await getAllLists(userData![0], userData![1]);
    if (response.ok) {
      const allLists = await response.json();
      setLists(allLists);
    }
  };
  // const userId: string = authState.accessToken.claims.cid;
  // const { accessToken } = useOktaAuth().authState.accessToken!;

  useEffect(() => {
    if (authState.isAuthenticated) {
      fetchLists();
    }
  }, [userData]);
  // const createList = (newList: BaseList) => setLists((todos) => [...todos, newTodo]);

  return (
    <AllListsContext.Provider value={{ userData, lists, fetchLists }}>
      {children}
    </AllListsContext.Provider>
  );
};
