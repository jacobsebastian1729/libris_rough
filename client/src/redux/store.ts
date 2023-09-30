import { configureStore } from "@reduxjs/toolkit";
import { searchReducer } from "./slices/search";
import { bookReducer } from "./slices/book";
import userReducer from "./slices/user";
import bookShelfListReducer from "./slices/bookShelf";
import commentsReducer from "./slices/comment";
import followReducer from "./slices/following";

const store = configureStore({
  reducer: {
    bookItem: bookReducer,
    user: userReducer,
    bookShelf: bookShelfListReducer,
    commentList: commentsReducer,
    searchBook: searchReducer,
    followList: followReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
