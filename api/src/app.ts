// server
import cors from 'cors';
import Express from 'express';
import passport from 'passport';

import { jwtAdminStrategy, jwtStrategy } from './config/passport';
import userRouter from './routes/user';
import commentsRouter from "./routes/comments";
import bookShelfRouter from "./routes/bookShelf"
import booksRouter from "./routes/book";
import followingRouter from './routes/following'

const app = Express();
app.use(Express.json());
app.use(cors());
app.use(passport.initialize());
passport.use(jwtStrategy)
passport.use('jwtAdmin', jwtAdminStrategy);

// routes
app.use("/bookshelves", bookShelfRouter)
app.use("/user", userRouter);
app.use("/books", booksRouter);
app.use("/comments", commentsRouter);
app.use("/following", followingRouter);

export default app;
