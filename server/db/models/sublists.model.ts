import { Document, model, Schema } from "mongoose";

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
  tasks: [String],
});

export interface SublistDocument extends Document {
  sublistId: string;
  listId: string;
  userId: boolean;
  order: number;
  tasks: string[];
};

export default model<SublistDocument>('sublist', SublistSchema);