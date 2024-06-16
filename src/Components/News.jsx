import NewsItem from './NewsItem'
import { useEffect, useState } from 'react'
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ newProgress, key, apiKey, category, country ,size}) => {
  // const ap = apikey;
// console.log(apikey)
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState()
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter = (string) => {
    return string[0].toUpperCase() + string.slice(1);
  }
 useEffect(() => {
    updateNews();
    document.title = `${capitalizeFirstLetter(category)} - News`
  }, [category])

  const updateNews = async () => {
    newProgress(10);
    const url = `https://newsdata.io/api/1/news?category=${category}&language=en&country=${country}&apikey=${apiKey}&size=${size}`
    
    // const url = `https://gnews.io/api/v4/top-headlines?token=${this.props.apiKey}&lang=en&topic=${this.props.category}&page=${this.state.page}&max=${this.props.pageSize}&country=${this.props.country}&q=none`;
    
    setLoading(true);
    let data = await fetch(url);

    newProgress(30);
    let preseData = await data.json();
    console.log(preseData)
    newProgress(50);
    setArticles(preseData.results);
    setPage(preseData.nextPage);
    setTotalResults(preseData.totalResults);
    setLoading(false);
    newProgress(100);
  }
  

  const fetchMoreData = async () => {
    const url = `https://newsdata.io/api/1/news?category=${category}&language=en&country=${country}&apikey=${apiKey}&size=${size}&page=${page}`;
    let data = await fetch(url);
    let preseData = await data.json();
    setArticles(articles.concat(preseData.results));
    setPage(preseData.nextPage)
    setTotalResults(preseData.totalResults);
    setLoading(false);
  }
    return (
      <div>
        <h2 className="text-center" style={{ margin: "86px 0px 18px 0" }}>News- Top Headline From {capitalizeFirstLetter(category)} Category
        </h2>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}>
          <div className="container">
            <div className="row">
              {articles.map(element => {
                return (
                  <div className="col-md-4" key={element.link}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) : ""}
                      newsUrl={element.link}
                      imageUrl={element.image_url}
                      date={element.pubDate}
                      source={element.source_id}
                      description={element.description ? element.description.slice(0, 88) : ""} />
                  </div>
                )
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    )
  }


export default News
