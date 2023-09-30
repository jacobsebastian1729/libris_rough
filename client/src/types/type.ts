export type UserType = {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export type LoginUserType = {
    email: string;
    password: string;
  };

export type UserDataType = {
    _id: string;
    email: string;
    fullName: string;
    profile_img?: string;
    about_me?: string;
    isAdmin: boolean;
    status: string;
    followers: string[];
    following: string[];
    bookShelves: string[];
    // comments: string[];
}

export type BookType = {
    title: string;
    thumbnail: string;
    language: string;
    description: string;
    rating: number;
    genre: string;
    author: string;
    _id?: string;
  };

export type BookList = BookType & {
    bookShelf: string
}

export type BookShelf = {
    userId: {
        email: string,
        _id: string,
    },
    books: BookType[];
}

export type CommentType = {
    comment: string;
    date: string;
    productId: string;
    userId: {
        email: string;
        _id: string;
    };
    parentCommentId: string;
    _id:string;
} 

export type UserFollowingType ={
    _id: string;
    userId:string;
    followingId: {
        _id: string;
        email: string;
    };

} 

export type UserFollowersType ={
    _id: string;
    userId:{
        _id: string;
        email: string;
    };
    followingId: string;

}