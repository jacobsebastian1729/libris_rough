import React, { useState } from "react";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBar.css";
import { useDispatch } from "react-redux";
import { searchActions } from "../../redux/slices/search";
import { styled, alpha } from "@mui/material/styles";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: "0",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "50%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function SearchBar() {
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = event.target.value;
    setUserInput(userInput);
    dispatch(searchActions.getUserInput(userInput));
  };
  const handleSearchClick = () => {
    dispatch(searchActions.getUserInput(userInput));
  };
  return (
    <div className="search-main">
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          id="standard-basic"
          placeholder="search by title or author"
          value={userInput}
          onChange={handleInputChange}
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
    </div>
  );
}
