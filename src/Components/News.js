import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spin from "./Spin";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
//import LoadingBar from 'react-top-loading-bar'

export class News extends Component {
  articles = [];
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalise = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      article: this.articles,
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title = `News Monkey - ${this.capitalise(this.props.category)}`;
  }

  async updatenews(props) {
    this.props.setProgress(30);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d4ad0fe7d1f7499a9e901374ccf8d423&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      article: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updatenews();
  }
  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updatenews();
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 })
    this.updatenews();
    // window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  fetchMoreData = async () => {

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d4ad0fe7d1f7499a9e901374ccf8d423&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({
      page: this.state.page + 1
    })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      article: this.state.article.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false
    });
  }

  render() {
    return (
      <>
        <h1 className="text-center" style={{ marginTop: '80px' }}>News Monkey - Top Headlines {this.capitalise(this.props.category)}</h1>
        {this.state.loading && <Spin />}
        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length !== this.state.totalResults}
          loader={<Spin />}
        >
          <div className="container">

            <div className="row">
              {
                this.state.article.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <NewsItem
                        title={element.title ? element.title.slice(0, 45) : ""}
                        description={
                          element.description
                            ? element.description.slice(0, 88)
                            : ""
                        }
                        imageUrl={
                          element.urlToImage
                            ? element.urlToImage
                            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxoBXjTFhrEUABXUBHBCbIZvtc9pggeiJzXQ&usqp=CAU"
                        }
                        newsUrl={element.url}
                        author={element.author ? element.author : "Unknown"}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  );
                })}
            </div>
          </div>

        </InfiniteScroll>
      </ >
    );
  };
}
export default News;
