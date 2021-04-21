// import mongoose from 'mongoose';
import { Document, model, Schema } from "mongoose";

const UserSchema = new Schema<UserDocument>({
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  oktaId: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
});

export interface UserDocument extends Document {
  userId: string;
  oktaId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export default model<UserDocument>('User', UserSchema)
// export interface UserModel extends Model<UserDocument> {
//   findUserByEmail(email: string): Promise<UserDocument>
// }
// const User = mongoose.model('users', userSchema);

// module.exports.User = User;
