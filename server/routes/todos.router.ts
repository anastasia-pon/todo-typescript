import express, { Request, Response } from 'express';
import * as ListService from "../db/services/lists.service";
import * as TaskService from "../db/services/tasks.service";
import * as SublistService from "../db/services/sublists.service";
import { BaseList } from "../interfaces/list.interface";
import { BaseTask } from "../interfaces/task.interface";
import { ListDocument } from '../db/models/lists.model';
import { SublistDocument } from '../db/models/sublists.model';
import { TaskDocument } from '../db/models/tasks.model';
// import { RequestWithJwt } from '../interfaces/request.interface';
// import fetch from 'node-fetch';
// import oktaClient from '../authentication/oktaClient';
import { authenticationRequired } from '../authentication/authentication';

// import { v4 as uuid } from 'uuid';

export const todosRouter = express.Router();

todosRouter.post('/get/all', authenticationRequired, async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const list: ListDocument[] = await ListService.findByUserId(userId);
    return res.status(201).json(list);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

todosRouter.post('/get/one', async (req: Request, res: Response) => {
  const { listId } = req.body;

  try {
    const list: ListDocument[] = await ListService.findByListId(listId);
    const sublists: SublistDocument[] = await SublistService.findById(listId);
    const tasks: TaskDocument[] = await TaskService.findByListId(listId);
    return res.status(201).json({list: list[0], sublists, tasks});
  } catch (err) {
    res.status(400).json(err.message);
  }
});

todosRouter.post('/create', authenticationRequired, async (req: Request, res: Response) => {
  const { title, desc, userId, listId } = req.body.list;

  if (!title || !desc || !userId || !listId) {
    const err = new Error('Missing list information');
    return res.status(500).json(err.message);
  }
  const listMatch: ListDocument[] = await ListService.findByListId(listId);
  if (listMatch.length > 0) {
    const err = new Error('List with this id already exists!');
    return res.status(400).json(err.message);
  }
  try {
    const newList: BaseList = {
      title,
      desc,
      listId,
      userId,
      coEditing: true,
      tasks: []
    };
    const dbList = await ListService.createList(newList);
    return res.status(201).json(dbList);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
});

todosRouter.post('/task/update', async (req: Request, res: Response) => {
  const { updatedTask }: {updatedTask: BaseTask} = req.body;

  if (!updatedTask.title || !updatedTask.taskId || !updatedTask.listId || !updatedTask.parentId || updatedTask.done === undefined || !updatedTask.type) {
    const err = new Error('Missing task information');
    return res.status(500).json(err.message);
  }

  const taskMatch: TaskDocument[] = await TaskService.findByTaskId(updatedTask.taskId);
  if (taskMatch.length === 0) {
    const err = new Error('Task does not exists');
    return res.status(400).json(err.message);
  }

  try {
    const dbResponse = await TaskService.updateTask(updatedTask);
    return res.status(201).json(dbResponse);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
});

todosRouter.post('/task/create', async (req: Request, res: Response) => {
  const { newTask }: {newTask: BaseTask} = req.body;

  if (!newTask.title || !newTask.taskId || !newTask.listId || !newTask.parentId || newTask.done === undefined || !newTask.type) {
    const err = new Error('Missing task information');
    return res.status(500).json(err.message);
  }

  const taskMatch: TaskDocument[] = await TaskService.findByTaskId(newTask.taskId);
  if (taskMatch.length > 0) {
    const err = new Error('Task with this id already exists');
    return res.status(400).json(err.message);
  }

  try {
    const dbTask = await TaskService.createTask(newTask);
    if (newTask.listId === dbTask.parentId) {
      await ListService.addTask(dbTask.listId, dbTask.taskId);
    } else {
      await TaskService.addSubtask(dbTask.parentId, dbTask.taskId);
    }
    return res.status(201).json(dbTask);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
});

todosRouter.post('/task/delete', async (req: Request, res: Response) => {
  const { taskId, parentId, listId }: {taskId: string, parentId: string, listId: string} = req.body;

  if (!taskId || !listId || !parentId) {
    const err = new Error('Missing task information');
    return res.status(500).json(err.message);
  }

  const taskMatch: TaskDocument[] = await TaskService.findByTaskId(taskId);
  if (taskMatch.length === 0) {
    const err = new Error('Task does not exist');
    return res.status(400).json(err.message);
  }

  try {
    const dbTask = await TaskService.deleteTask(taskId);
    if (listId === parentId) {
      const respnse = await ListService.deleteTask(listId, taskId);
    } else {
      const respnse = await TaskService.deleteSubtask(parentId, taskId);
    }
    return res.status(201).json(dbTask);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
});
