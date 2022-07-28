import React, { Component } from "react";
import "./TopButton.css";
import { IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";

export class Topbutton extends Component {
  render() {
    return (
      <div>
        {/* <Link className="goTop" to="/">
          <IoIosArrowUp />
        </Link> */}
        <a href="/" className="goTop">
          <IoIosArrowUp />
        </a>
      </div>
    );
  }
}
