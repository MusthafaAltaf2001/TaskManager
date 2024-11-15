import mongoose, { Document, Schema } from "mongoose";

// User interface with tasks
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// User Schema Definition
const userSchema: Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Export User Models
export const User = mongoose.model<IUser>("User", userSchema);
