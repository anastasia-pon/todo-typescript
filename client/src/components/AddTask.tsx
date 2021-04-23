/* eslint-disable max-len */
import * as React from 'react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';

const AddTask = (props: {
  listId: string;
  parentId: string;
  handleAddTask: (task: BaseTask) => {},
}) => {
  const { listId, parentId, handleAddTask } = props;
  const [title, setTitle] = useState('');
  const [type, setType] = useState('other');
  const [deadline, setDeadline] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [protein, setProtein] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [cost, setCost] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => setType(e.target.value);
  const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => setDeadline(e.target.value);
  const handleCarbsChange = (e: React.ChangeEvent<HTMLInputElement>) => setCarbs(e.target.value);
  const handleFatChange = (e: React.ChangeEvent<HTMLInputElement>) => setFat(e.target.value);
  const handleProteinChange = (e: React.ChangeEvent<HTMLInputElement>) => setProtein(e.target.value);
  const handleImgUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => setImgUrl(e.target.value);
  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => setCost(e.target.value);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: BaseTask = {
      taskId: uuid(),
      parentId,
      listId,
      title,
      done: false,
      cost,
      type,
      deadline: type === 'work' ? deadline : '',
      carbs: type === 'food' ? carbs : '',
      fat: type === 'food' ? fat : '',
      protein: type === 'food' ? protein : '',
      img: type === 'food' ? imgUrl : '',
      subtasks: [],
    };

    handleAddTask(newTask);
    setTitle('');
    setType('Other');
    setDeadline('');
    setCarbs('');
    setFat('');
    setProtein('');
    setImgUrl('');
    setCost('');
  };
  return (
    <form id={listId} onSubmit={handleSubmit}>
      <label htmlFor="title">
        <input
          id="title"
          type="text"
          placeholder="Add a title"
          value={title}
          onChange={handleTitleChange}
          required
        />
      </label>
      <label htmlFor="type">
        <input type="radio" value="work" name="type" onChange={handleTypeChange} />
        {' '}
        Work
        <input type="radio" value="food" name="type" onChange={handleTypeChange} />
        {' '}
        Food
        <input type="radio" value="other" name="type" onChange={handleTypeChange} defaultChecked />
        {' '}
        Other
      </label>
      {type === 'work' && (
        <label htmlFor="deadline">
          <input
            id="deadline"
            type="date"
            placeholder="Add a deadline"
            value={deadline}
            onChange={handleDeadlineChange}
            required
          />
        </label>
      )}
      {type === 'food' && (
        <>
          <label htmlFor="carbs">
            <input
              id="carbs"
              type="number"
              pattern="^\d+$"
              placeholder="Add a carbs"
              value={carbs}
              onChange={handleCarbsChange}
              required
            />
            {' '}
            g/100g
          </label>
          <label htmlFor="fat">
            <input
              id="fat"
              type="number"
              pattern="^\d+$"
              placeholder="Add a fat"
              value={fat}
              onChange={handleFatChange}
              required
            />
            {' '}
            g/100g
          </label>
          <label htmlFor="protein">
            <input
              id="protein"
              type="number"
              pattern="^\d+$"
              placeholder="Add a protein"
              value={protein}
              onChange={handleProteinChange}
              required
            />
            {' '}
            g/100g
          </label>
          <label htmlFor="imgUrl">
            <input
              id="imgUrl"
              type="text"
              placeholder="Add an imgUrl"
              value={imgUrl}
              onChange={handleImgUrlChange}
            />
          </label>
        </>
      )}
      <label htmlFor="cost">
        <input
          id="cost"
          type="number"
          pattern="^\d+$"
          placeholder="Add a cost"
          value={cost}
          onChange={handleCostChange}
        />
        {' '}
        SEK
      </label>
      <button type="submit">Add a Task</button>
    </form>
  );
};

export default AddTask;
