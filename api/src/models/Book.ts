import mongoose from "mongoose";
import { Document } from "mongoose";
export type BookDocument = Document & {
  title: string;
  thumbnail: string;
  language: string;
  description: string;
  rating: number;
  genre: string;
  author: string;
};

export const BookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  language: {
    type: String,
  },
  description: {
    type: String,
  },
  rating: {
    type: Number,
  },
  category: {
    type: String,
  },
  genre: {
    type: String,
    enum: ["Novel", "children", "Romance"],
    default: "Novel",
  },
  // },
  /*  comments:[ {type:CommentsSchema}],
  ref:"comments"),*/
  author: {
    type: String,
  },
});

export default mongoose.model<BookDocument>("Book", BookSchema);
