import React from "react";
import "./Search.css";
// import { AiOutlineSearch } from "react-icons/ai";

const Search = (props) => {
  return (
    <div className="ui search">
      <div className="ui icon input">
        <input
          value={props.articleValue}
          onChange={props.onChangeHandler}
          className="prompt"
          type="text"
          placeholder="Search Contacts..."
        />
        <i className="search icon" />
      </div>
      <div className="results" />
    </div>
  );
};

export default Search;
