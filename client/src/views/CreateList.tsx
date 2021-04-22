/* eslint-disable max-len */
import * as React from 'react';
import { useState } from 'react';
// import { useHistory } from 'react-router-dom';

const CreateList = () => {
  // const history = useHistory();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => setDesc(e.target.value);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  //   const newUser = {
  //     title,
  //     desc,
  //     userId,
  //   };
  //   const response = await createNewUser(newUser);
  //   if (!response.ok) {
  //     setError(true);
  //     return setErrorMessage('Registration failed');
  //   }
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
    </form>
  );
};

export default CreateList;
