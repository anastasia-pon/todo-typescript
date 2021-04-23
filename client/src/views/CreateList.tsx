/* eslint-disable max-len */
import * as React from 'react';
import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { AllListsContext } from '../context/AllListsContext';
import { createNewList } from '../modules/api';
import Error from '../components/Error';

const CreateList: React.FC = () => {
  const history = useHistory();
  const { userData, fetchLists } = useContext(AllListsContext);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!userData) {
    return <div>Loading...</div>;
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => setDesc(e.target.value);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newList: BaseList = {
      title,
      desc,
      userId: userData[0],
      listId: uuid(),
    };
    const response = await createNewList(newList, userData[1]);
    if (!response.ok) {
      setError(true);
      return setErrorMessage('Could not save. Please, try again.');
    }
    const listRes = await response.json();
    console.log(listRes, 'response');
    fetchLists();
    // return history.push('/');
    return history.push(`/list/${newList.listId}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <p>Create a ToDo list</p>
      <label htmlFor="title">
        Title *
        <input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </label>
      <label htmlFor="desc">
        Description *
        <input
          id="desc"
          type="text"
          value={desc}
          onChange={handleDescriptionChange}
          required
        />
      </label>
      <p>Fields marked with * are required</p>
      <button type="submit">Create</button>
      {error && <Error setError={setError} errorMessage={errorMessage} />}
    </form>
  );
};

export default CreateList;
