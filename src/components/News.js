/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-lone-blocks */
import React, { Component } from "react";
import { NewsItems } from "./NewsItems";
import ClipLoader from "react-spinners/ClipLoader";
import propTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
// import { IoIosArrowUp } from "react-icons/io";
// import { Link } from "react-router-dom";
import { Topbutton } from "./TopButton/TopButton";
import { Navbar } from "./Navbar/Navbar";
import Search from "./Search";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 40,
    category: "general",
  };

  static propTypes = {
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string,
  };

  capitalFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      searchTerm: "",
    };
    document.title = `${this.capitalFirstLetter(
      this.props.category
    )} - The Daily News`;
  }

  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f24faf9c39814e3a82a97439bba70d00&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      isLoading: false,
    });
  }

  async componentDidMount() {
    this.updateNews();
    this.setState({
      articles: [],
    });
  }

  onSearchHandler = (e) => {
    this.setState({
      searchTerm: e.target.value,
    });
  };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f24faf9c39814e3a82a97439bba70d00&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      isLoading: false,
    });
  };

  render() {
    const toSearch = (searchTerm) => (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase());
    if (this.state.isLoading) {
      return (
        <span>
          <center>
            <ClipLoader loading={this.loading} size={35} />
          </center>
        </span>
      );
    } else {
      return (
        <>
          <Navbar />
          <h4 className="pt-3 mx-5 px-3">The Daily News - Top Headlines</h4>
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={
              <center>
                <ClipLoader
                  loading={this.loading}
                  className="justify-content-center"
                  size={35}
                />
              </center>
            }
          >
            <Search
              className=""
              articleValue={this.state.searchTerm}
              onChangeHandler={this.onSearchHandler}
            />
            <div className="container">
              <div className="row">
                {this.state.articles
                  .filter(toSearch(this.state.searchTerm))
                  .map((element, index) => {
                    console.log(element);
                    return (
                      <div className="col-md-4" key={index}>
                        <NewsItems
                          title={
                            element.title ? element.title.slice(0, 45) : ""
                          }
                          description={
                            element.description
                              ? element.description.slice(0, 85)
                              : ""
                          }
                          source={element.source.name}
                          imgUrl={element.urlToImage}
                          newsUrl={element.url}
                          author={element.author}
                          date={element.publishedAt}
                        />
                      </div>
                    );
                  })}
              </div>
              {/* <Topbutton /> */}
            </div>
          </InfiniteScroll>
        </>
      );
    }
  }
}

{
  /* <button
              type="button"
              disabled={this.state.page <= 1}
              className="btn btn-sm btn-dark"
              onClick={this.handlePrevClick}
            >
              Previous
            </button>
            <button
              type="button"
              className="btn btn-sm btn-dark"
              onClick={this.handleNextClick}
              disabled={this.state.page > 1}
            >
              Next
            </button> */
}

// handlePrevClick = async () => {
//   let url = `https://newsapi.org/v2/top-headlines?country=in&category=${
//     this.props.category
//   }&apiKey=f24faf9c39814e3a82a97439bba70d00&page=${
//     this.state.page - 1
//   }&pageSize=${this.props.pageSize}`;
//   let data = await fetch(url);
//   let parsedData = await data.json();
//   console.log(parsedData);
//   this.setState({ articles: parsedData.articles });
//   this.setState({
//     page: this.state.page - 1,
//     articles: parsedData.articles,
//   });
// };

// handleNextClick = async () => {
//   if (
//     this.state.page + 1 >
//     Math.ceil(this.state.totalResults / this.props.pageSize)
//   ) {
//   } else {
//     let url = `https://newsapi.org/v2/top-headlines?country=in&category=${
//       this.props.category
//     }&apiKey=f24faf9c39814e3a82a97439bba70d00&page=${
//       this.state.page + 1
//     }&pageSize=${this.props.pageSize}`;
//     let data = await fetch(url);
//     let parsedData = await data.json();
//     console.log(parsedData);
//     this.setState({ articles: parsedData.articles });
//     this.setState({
//       page: this.state.page + 1,
//       articles: parsedData.articles,
//     });
//   }
// };
