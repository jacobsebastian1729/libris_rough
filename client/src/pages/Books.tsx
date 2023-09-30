import React from "react";
import BooksList from "../components/Books/BooksList";

import SearchBar from "../components/searchbar/SearchBar";
export default function Books() {
  return (
    <div>
      <SearchBar></SearchBar>
      <BooksList />
    </div>
  );
}
