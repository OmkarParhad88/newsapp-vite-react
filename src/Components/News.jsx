import NewsItem from "./NewsItem";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

const News = ({ newProgress, key, apiKey, category, country, size }) => {
 const [articles, setArticles] = useState([]);
 const [loading, setLoading] = useState(true);
 const [page, setPage] = useState();
 const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(false);
  const[errorMessage, setErrorMessage] = useState('');

 const capitalizeFirstLetter = (string) => {
  return string[0].toUpperCase() + string.slice(1);
 };
 useEffect(() => {
  updateNews();
  document.title = `${capitalizeFirstLetter(category)} - News`;
 }, [category, country]);

 const updateNews = async () => {
  newProgress(10);
  const url = `https://newsdata.io/api/1/news?category=${category}&language=en&country=${country}&apikey=${apiKey}&size=${size}`;
  setLoading(true);
  await axios
   .get(url)
   .then((response) => {
    newProgress(30);
    let data = response.data;
    newProgress(50);
    setArticles(data.results);
    setPage(data.nextPage);
    setTotalResults(data.totalResults);
    setLoading(false);
    newProgress(100);
   })
   .catch((error)=> {
    console.log(error);
    setLoading(false);
    newProgress(100);
     setError(true);
     setErrorMessage(error.message);
   });
 };

 const fetchMoreData = async () => {
  const url = `https://newsdata.io/api/1/news?category=${category}&language=en&country=${country}&apikey=${apiKey}&size=${size}&page=${page}`;
  let data = await fetch(url);
  let preseData = await data.json();
  setArticles(articles.concat(preseData.results));
  setPage(preseData.nextPage);
  setTotalResults(preseData.totalResults);
  setLoading(false);
 };
 return (
  <div>
   <h2 className="text-center" style={{ margin: "86px 0px 18px 0" }}>
    News- Top Headline From {capitalizeFirstLetter(category)} Category
   </h2>
   {loading && <Spinner />}
   <InfiniteScroll
    dataLength={articles.length}
    next={fetchMoreData}
    hasMore={articles.length !== totalResults}
    loader={<Spinner />}
   >
    <div className="container">
     <div className="row">
      {error ? (
       <div style={{ color: "red", textAlign: "center" }}>{errorMessage}</div>
      ) : (
       articles.map((element) => {
        return (
         <div className="col-md-4" key={element.link}>
          <NewsItem
           title={
            element.title ? element.title.slice(0, 45) : "Title not provided"
           }
           newsUrl={element.link}
           imageUrl={element.image_url}
           date={element.pubDate}
           source={element.source_id}
           description={
            element.description
             ? element.description.slice(0, 88)
             : "Description not provided"
           }
          />
         </div>
        );
       })
      )}
     </div>
    </div>
   </InfiniteScroll>
  </div>
 );
};

export default News;
