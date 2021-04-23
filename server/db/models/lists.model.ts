import { Document, model, Schema } from "mongoose";

const ListSchema = new Schema<ListDocument>({
  title: {
    type: String,
    required: true,
  },
	desc: {
    type: String,
    required: true,
  },
	listId: {
    type: String,
    unique: true,
    required: true,
  },
	userId: {
    type: String,
    required: true,
  },
	coEditing: {
    type: Boolean,
    required: true,
  },
	tasks: [String],
});

// export interface TaskDocument extends Document {
//   title: string;
//   taskId: string;
//   done: boolean;
//   order: number;
//   cost: number;
//   type: string;
//   deadline?: string;
//   carbs?: number;
//   fat?: number;
//   protein?: number;
//   img?: string;
//   sublistId?: string;
// };

export interface ListDocument extends Document {
  title: string;
  desc: string;
  listId: string;
  userId: string;
  coEditing: boolean;
  tasks?: string[];
};

export default model<ListDocument>('lists', ListSchema);