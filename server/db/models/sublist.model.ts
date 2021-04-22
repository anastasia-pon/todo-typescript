import { Document, model, Schema } from "mongoose";
import { TaskSchema, TaskDocument } from './tasks.model';

export const SublistSchema = new Schema<SublistDocument>({
  sublistId: {
    type: String,
    unique: true,
    required: true,
  },
	listId: {
    type: String,
    unique: true,
    required: true,
  },
  userId: {
    type: Boolean,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  tasks: [TaskSchema],
});

export interface SublistDocument extends Document {
  sublistId: string;
  listId: string;
  userId: boolean;
  order: number;
  tasks: TaskDocument[];
};

export default model<SublistDocument>('tasks', SublistSchema);