export interface TodoTask {
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
}

// export interface TodoList {
//   title: string;
//   desc: string;
//   listId: string;
//   userId: string;
//   coEditing: boolean;
//   tasks?: TodoTask[];
// }
