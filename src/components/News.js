import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    console.log("hello i am constructure from news component");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - HinduNews`;
  }
  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=81e0d3d0ad7b4b9a965ff90432cf9fea&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let response = await fetch(url);
    this.props.setProgress(30);
    let data = await response.json();
    this.props.setProgress(50);
    console.log(data);
    this.setState({ articles: data.articles, totalResults: data.totalResults, loading: false
    });
    this.props.setProgress(100);

  }
  async componentDidMount() {
    this.updateNews();
  }

  handlePreviousClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();

  }
  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=81e0d3d0ad7b4b9a965ff90432cf9fea&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    this.setState({ articles: this.state.articles.concat(data.articles), totalResults: data.totalResults
    });
  };



  render() {
    return (
      <>
        <h1 className="text-center">HinduNews - Top {this.capitalizeFirstLetter(this.props.category)} Headings</h1>
        {this.state.loading && <Spinner/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
      <div className="container">
          <div className="row">
            {this.state.articles.map((element) => {

              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
          </div>

        </InfiniteScroll>
        
      </>

    )
  }
}

export default News
