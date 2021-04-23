/* eslint-disable max-len */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  getList, createNewTask, updateTask, deleteTask,
} from '../modules/api';
// import { v4 as uuid } from 'uuid';

// import { AllListsContext } from '../context/AllListsContext';
import Error from '../components/Error';
import AddTask from '../components/AddTask';
import Task from '../components/Task';

const List: React.FC = () => {
  const { idParam } = useParams<{ idParam: string }>();
  const history = useHistory();
  const [fullList, setFullList] = useState<FullListState>();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  // const { userData, fetchLists } = useContext(AllListsContext);
  // const [title, setTitle] = useState('');
  // const [desc, setDesc] = useState('');
  console.log(fullList);
  if (!idParam) {
    history.push('/');
    return null;
  }
  const fetchList = async () => {
    const response = await getList(idParam);
    if (response.ok) {
      const listResponse = await response.json();
      setFullList(listResponse);
    } else {
      setError(true);
      setErrorMessage('Could not fetch the list.');
    }
  };

  const handleAddTask = async (newTask: BaseTask) => {
    const taskResponse = await createNewTask(newTask);
    if (taskResponse.ok) {
      fetchList();
    } else {
      setError(true);
      setErrorMessage('Could not add the task.');
    }
  };

  const handleUpdateTask = async (updatedTask: BaseTask) => {
    const taskResponse = await updateTask(updatedTask);
    if (taskResponse.ok) {
      fetchList();
    } else {
      setError(true);
      setErrorMessage('Could not add the task.');
    }
  };

  const handleDeleteTask = async (taskId: string, parentId: string, listId: string) => {
    const taskResponse = await deleteTask(taskId, parentId, listId);
    if (taskResponse.ok) {
      fetchList();
    } else {
      setError(true);
      setErrorMessage('Could not delete the task.');
    }
  };

  useEffect(() => {
    if (!fullList && idParam) {
      fetchList();
    }
  }, []);
  return (
    <main>
      <div className="main__container">
        {error && <Error setError={setError} errorMessage={errorMessage} />}
        {fullList && (
          <div id={fullList.list.listId}>
            <p>{fullList.list.title}</p>
            <p>{fullList.list.desc}</p>
            {fullList.tasks.map((t: BaseTask) => t.parentId === fullList.list.listId && (
              <Task
                task={t}
                handleUpdateTask={handleUpdateTask}
                handleDeleteTask={handleDeleteTask}
                key={t.taskId}
              />
            ))}
            <AddTask
              listId={fullList.list.listId}
              parentId={fullList.list.listId}
              handleAddTask={handleAddTask}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default List;
