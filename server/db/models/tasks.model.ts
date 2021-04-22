import { Document, model, Schema } from "mongoose";

export const TaskSchema = new Schema<TaskDocument>({
  title: {
    type: String,
    required: true,
  },
	taskId: {
    type: String,
    unique: true,
    required: true,
  },
  done: {
    type: Boolean,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
	type: {
    type: String,
    required: true,
  },
	deadline: {
    type: String,
  },
	carbs: {
    type: Number,
  },
	fat: {
    type: Number,
  },
  protein: {
    type: Number,
  },
  img: {
    type: String,
  },
  sublistId: {
    type: String,
    required: true,
  },
});

export interface TaskDocument extends Document {
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

export default model<TaskDocument>('tasks', TaskSchema);