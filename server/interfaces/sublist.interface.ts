import { BaseTask } from './task.interface';

export interface BaseSublist {
  sublistId: string;
  listId: string;
  userId: boolean;
  order: number;
  tasks: BaseTask[];
};
