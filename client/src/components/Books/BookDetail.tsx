import React from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import Rating from "@mui/material/Rating";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { Grid, CardMedia, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import "./BookDetail.css";
import Comments from "../Comments/Comments";
import { fetchBookDetail } from "../../redux/thunk/bookDetails";
import { addBookToUserBookShelf } from "../../redux/thunk/user";
import { addBookToBookShelfData } from "../../redux/thunk/bookShelf";
// import { myBooksActions } from "../../redux/slice/myBooks";

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    margin: "0 auto",
    paddingTop: 100,
  },
  cover: {
    height: 300,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
});
export default function BookDetail() {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const user = useSelector((state: RootState) => state.user.loginUser);
  const myBooks = user?.bookShelves;
  const userId = user?._id as string

 const { bookId } = useParams() 
 
  const myBooksBtnHandler = (userId:string, bookId:string) => {
    if(bookId) {
      dispatch(addBookToUserBookShelf(userId, bookId))
      dispatch(addBookToBookShelfData(userId, bookId))
    } 
  }

  const classes = useStyles();
 
  const bookDetail = useSelector(
    (state: RootState) => state.bookItem.bookDetails
  );

  console.log('bookId', bookId)
  
  
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchBookDetail(bookId));
    console.log(bookId, "got id");
  }, [dispatch, bookId]);
  return (
    <div>
      <div className="main-bookDetails1">
        <Paper
          elevation={6}
          sx={{
            width: 700,
            height: 'fit-content',
            backgroundColor: "aliceblue",
            mt: 5,
            ml: '22%',
            mb: '2rem',
          }}
        >
          <Grid container className={classes.root}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardMedia
                  className={classes.cover}
                  image={bookDetail.thumbnail}
                />

              </Card>
            </Grid>
            <Grid item xs={8} md={0}>
              <CardContent>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontSize: "40px",
                    fontWeight: "bold",
                    fontFamily: "verdana",
                  }}
                >
                  {bookDetail.title}
                </Typography>

                <Typography variant="subtitle1" gutterBottom>
                  by {bookDetail.author}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {bookDetail.genre}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {bookDetail.language}
                </Typography>
                <Rating
                  name="half-rating-read"
                  defaultValue={bookDetail.rating}
                  size="small"
                  precision={0.5}
                  readOnly
                />
                <Typography variant="body1" paragraph>
                  {showFullDescription ? (
                    <p>{bookDetail.description}</p>
                  ) : (
                    `${bookDetail.description.slice(0, 80)}...`
                  )}
                </Typography>
                <Button onClick={toggleDescription} color="info">
                  {showFullDescription ? "Read less" : "Read more"}
                </Button>
                <Button onClick={()=>{
                  if(bookId){
                    myBooksBtnHandler(userId, bookId)
                  }
                  }}>
                    Add to My Books
                </Button>
              </CardContent>
            </Grid>
          </Grid>
        </Paper>
      </div>

      <Comments key={bookDetail._id} prop = {bookDetail} userId={userId}/>
    </div>
  );
}
