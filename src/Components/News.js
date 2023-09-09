import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResultes, setTotalResultes] = useState(0)


  const capitalizeFirstLetter = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.newProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.newProgress(30);
    let preseData = await data.json();
    props.newProgress(50);
    setArticles(preseData.articles);
    setTotalResultes(preseData.totalResultes);
    setLoading(false);
    props.newProgress(100);
  }

  useEffect(() => {
    updateNews();
    document.title = `${capitalizeFirstLetter(props.category)} - News`

  }, [])

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?category=${props.category}&country=${props.country}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    let data = await fetch(url);
    let preseData = await data.json();
    setArticles(articles.concat(preseData.articles));
    setTotalResultes(preseData.totalResultes);
    setLoading(false);
  }
  return (
    <>
      <h2 className="text-center" style={{ margin: "77px 0px 14px 0" }}>News- Top Headline From {capitalizeFirstLetter(props.category)} Category
      </h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResultes}
        loader={<Spinner />}>
        <div className="container">
          <div className="row">
            {articles.map(element => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""} newsUrl={element.url} imageUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name} description={element.description ? element.description.slice(0, 88) : ""} />
                </div>
              )
            })
            }</div>
        </div>
      </InfiniteScroll>
    </>
  )
}

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general"
}
News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
}

export default News
