import Book from "../models/Book";
import { BookDocument } from "../models/Book";
//create function
const createNewBook = async (newBook: BookDocument): Promise<BookDocument> => {
  return newBook.save();
};
//get function
const getAllbooks = async (): Promise<BookDocument[]> => {
  return Book.find();
};
//get by Id
const getBookById = async (bookId: string): Promise<BookDocument | null> => {
  return Book.findById(bookId);
};
//delete by Id
const deleteBookByid = async (bookId: string): Promise<BookDocument | null> => {
  return Book.findByIdAndDelete(bookId);
};
// update by id
const updateBookById = async (
  bookId: string,
  update: Partial<BookDocument>
): Promise<BookDocument | null> => {
  return Book.findByIdAndUpdate(bookId, update, { new: true });
};

export default {
  createNewBook,
  getAllbooks,
  getBookById,
  deleteBookByid,
  updateBookById,
};
