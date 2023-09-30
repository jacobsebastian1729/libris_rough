import BookShelf, { BookShelfDocument } from "../models/Bookshelf";

const createBookShelf = async (
    bookShelf: BookShelfDocument
): Promise<BookShelfDocument> => {
    return bookShelf.save()
};


export default { createBookShelf };