import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Search from "../Search";

export class Navbar extends Component {
  state = {
    searchTerm: "",
    articles: [],
    searchTerm: this.props.searchTerm,
  };

  render() {
    const toSearch = (searchTerm) => (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return (
      <>
        <nav className={`navbar navbar-expand-lg navbar`}>
          <Link className="head-title" to="/">
            The Daily News
          </Link>
          <button
            className="navbar-toggler bg-light btn-dark mx-3"
            type="button"
            data-toggle="collapse"
            data-target="#collapsibleNavbar"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* <div className="container"> */}
          <div
            className="collapse navbar-collapse menu-bar"
            id="collapsibleNavbar"
          >
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li>
                <Link className="nav-link home-link" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="nav-link home-link" to="/business">
                  Business
                </Link>
              </li>
              <li>
                <Link className="nav-link home-link" to="/entertainment">
                  Entertainment
                </Link>
              </li>
              <li>
                <Link className="nav-link home-link" to="/general">
                  General
                </Link>
              </li>
              <li>
                <Link className="nav-link home-link" to="/health">
                  Health
                </Link>
              </li>
              <li>
                <Link className="nav-link home-link" to="/science">
                  Science
                </Link>
              </li>
              <li>
                <Link className="nav-link home-link" to="/sports">
                  Sports
                </Link>
              </li>
              <li>
                <Link className="nav-link home-link" to="/technology">
                  Technology
                </Link>
              </li>
              <li>
                <Search
                  className="py-3"
                  articleValue={this.state.searchTerm}
                  onChangeHandler={this.onSearchHandler}
                />
              </li>
            </ul>
          </div>
          {/* </div> */}
        </nav>
      </>
    );
  }
}
