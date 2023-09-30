import bookService from "../services/book";
import { Request, Response } from "express";
import Book from "../models/Book";

// post method
export const createBook = async (req: Request, res: Response) => {
  try {
    const {
      title,
      thumbnail,
      language,
      description,
      rating,
      category,
      genre,
      author,
    } = req.body;
    const newData = new Book({
      title: title,
      thumbnail: thumbnail,
      language: language,
      description: description,
      rating: rating,
      category: category,
      genre: genre,
      author: author,
    });
    const newBookData = await bookService.createNewBook(newData);
    res.status(200).json({
      data: newBookData,
      success: true,
      message: " new Book created",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "something wrong" + error,
    });
    console.log(error);
  }
};
// get method
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const allBooks = await bookService.getAllbooks();
    res.status(200).json(allBooks);
  } catch (error) {
    res.status(400).json({ message: "somthing wrong" + error });
    console.log(error);
  }
};
//delete method
export const deleteBookByid = async (req: Request, res: Response) => {
  try {
    const deleteItem = await bookService.deleteBookByid(req.params.bookId);
    res.status(200).json({
      data: deleteItem,
      message: "item deleted",
      success: true,
    });
  } catch (error) {
    res.status(400).json({ message: "somthing wrong" + error });
    console.log(error);
  }
};
// get details by Id
export const getBookByid = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const data = await bookService.getBookById(bookId);
    if (!data) {
      return res.status(404).json("book not found");
    }
    return res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: "somthing wrong" + error });
    console.log(error);
  }
};
// update by Id
export const updateBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const update = req.body;
    const updateBook = await bookService.updateBookById(bookId, update);
    res.status(200).json(updateBook);
  } catch (err) {
    res.status(500).json("Server error");
  }
};


