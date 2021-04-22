export interface BaseTask {
  title: string;
  taskId: string;
  done: boolean;
  order: number;
  cost: number;
  type: string;
  deadline?: string;
  carbs?: number;
  fat?: number;
  protein?: number;
  img?: string;
  sublistId?: string;
};