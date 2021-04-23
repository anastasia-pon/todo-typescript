import * as React from 'react';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
// import { useOktaAuth } from '@okta/okta-react';

import { AllListsContext } from '../context/AllListsContext';

import Error from '../components/Error';

const Home: React.FC = () => {
  const history = useHistory();
  const { lists } = useContext(AllListsContext);
  const [error, setError] = useState(false);
  const [errorMessage] = useState('');

  const handleDelete = async (e: React.MouseEvent) => {
    console.log((e.target as HTMLElement).id);
    // const response = await deleteList(listId);
    // if (!response.ok) {
    //   setError(true);
    //   return setErrorMessage('Could not delete');
    // }
  };
  return (
    <div>
      {error && <Error setError={setError} errorMessage={errorMessage} />}
      <button type="button" onClick={() => { history.push('/create'); }}>Create a List</button>
      {!lists || lists.length === 0 ? <p>There are no ToDo lists yet.</p> : lists.map((l) => (
        <article id={l.listId} key={l.listId}>
          <div className="cntainer">
            <p className="list__title">{l.title}</p>
            <p className="list__title">{l.desc}</p>
            <button type="button" onClick={() => { history.push(`/list/${l.listId}`); }}>View</button>
            <button type="button" id={l.listId} onClick={handleDelete}>Delete</button>
          </div>
        </article>
      ))}
    </div>
  );
};
export default Home;
