import mongoose, { Document } from "mongoose";
import { BookDocument, BookSchema } from "./Book";

export type BookShelfDocument = Document & {
    books: BookDocument[];
    userId: string;
};

const BookShelfSchema = new mongoose.Schema({
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
})

export default mongoose.model<BookShelfDocument>("BookShelf", BookShelfSchema);