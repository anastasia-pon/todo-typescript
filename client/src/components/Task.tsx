/* eslint-disable max-len */
import * as React from 'react';
import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Task = (props: {
  task: BaseTask;
  handleUpdateTask: (task: BaseTask) => {};
  handleDeleteTask: (taskId: string, parentId: string, listId: string) => {};
}) => {
  const { task, handleUpdateTask, handleDeleteTask } = props;
  if (!task) {
    return null;
  }
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [type, setType] = useState(task.type);
  const [deadline, setDeadline] = useState(task.deadline);
  const [carbs, setCarbs] = useState(task.carbs);
  const [fat, setFat] = useState(task.fat);
  const [protein, setProtein] = useState(task.protein);
  const [imgUrl, setImgUrl] = useState(task.img);
  const [cost, setCost] = useState(task.cost);

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
    setEditing(false);
    const updatedTask: BaseTask = {
      taskId: task.taskId,
      parentId: task.parentId,
      listId: task.listId,
      title,
      done: task.done,
      cost,
      type,
      deadline: type === 'work' ? deadline : '',
      carbs: type === 'food' ? carbs : '',
      fat: type === 'food' ? fat : '',
      protein: type === 'food' ? protein : '',
      img: type === 'food' ? imgUrl : '',
      subtasks: task.subtasks,
    };
    handleUpdateTask(updatedTask);
  };
  return (
    <article>
      {editing ? (
        <form id={task.taskId} onSubmit={handleSubmit}>
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
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div className={task.type}>
          <p>{task.title}</p>
          <p>{task.done ? 'Done' : 'Not Done'}</p>
          {task.cost && (
            <p>
              Cost:
              {' '}
              {task.cost}
            </p>
          )}
          {task.type === 'work' && (
            <p>
              Deadline:
              {' '}
              {task.deadline}
            </p>
          )}
          {task.type === 'food' && (
            <p>
              Carbs:
              {' '}
              {task.carbs}
              Fat:
              {' '}
              {task.fat}
              Protein:
              {' '}
              {task.protein}
            </p>
          )}
          {task.type === 'food' && (
            <img src={task.img} alt={task.title} />
          )}
          <button type="button" onClick={() => setEditing(true)}>Edit</button>
          <button type="button" onClick={() => handleDeleteTask(task.taskId, task.parentId, task.listId)}>Delete</button>
        </div>
      )}
    </article>
  );
};

export default Task;
