import mongoose, { Document } from 'mongoose';

import { BookDocument } from './Book';
import { CommentDocument } from './Comments';

export type UserDocument = Document & {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  status: string;
  profile_img?: string;
  about_me?: string;
  followers?: string[];
  following?: string[];
  bookShelves?: BookDocument[];
  comments?: CommentDocument[];
};

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  fullName: {
    type: String,
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
  isAdmin: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'banned'],
    default: 'inactive',
  },
  profile_img: {
    type: String,
  },
  about_me: {
    type: String,
  },
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  bookShelves: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book',
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

export default mongoose.model<UserDocument>('User', UserSchema);
