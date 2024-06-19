import NewsItem from "./NewsItem";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { useSelector } from "react-redux";

const News = ({ newProgress, key, apiKey, category,  size }) => {
 const [articles, setArticles] = useState([]);
 const [loading, setLoading] = useState(false);
 const [page, setPage] = useState();
 const [totalResults, setTotalResults] = useState(0);
 const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const code = useSelector((state) => state.country.code);
  const region = useSelector((state) => state.country.region);

 const capitalizeFirstLetter = (string) => {
  return string[0].toUpperCase() + string.slice(1);
 };
 useEffect(() => {
  updateNews();
  document.title = `${capitalizeFirstLetter(category)} - News from ${code}`;
 }, [category, code]);

 const updateNews = async () => {
  newProgress(10);
  const url = `https://newsdata.io/api/1/news?category=${category}&language=en&country=${code}&apikey=${apiKey}&size=${size}`;
  setLoading(true);
  await axios
   .get(url)
   .then((response) => {
    setError(false);
    newProgress(30);
     let data = response.data;
     console.log(data)
    newProgress(50);
    setArticles(data.results);
    setPage(data.nextPage);
    setTotalResults(data.totalResults);
    setLoading(false);
    newProgress(100);
   })
   .catch((error) => {
    console.log(error);
    setLoading(false);
    newProgress(100);
    setError(true);
    setErrorMessage(error.message);
   });
 };

 const fetchMoreData = async () => {
  const url = `https://newsdata.io/api/1/news?category=${category}&language=en&country=${code}&apikey=${apiKey}&size=${size}&page=${page}`;

  await axios
   .get(url)
   .then((response) => {
    let data = response.data;
    setArticles(articles.concat(data.results));
    setPage(data.nextPage);
    setTotalResults(data.totalResults);
    setLoading(false);
   })
   .catch((error) => {
    setLoading(false);
    setError(true);
    setErrorMessage(`${error.message} ${error.response.statusText}`);
   });
 };
 return (
  <div>
   <h2 className="text-center" style={{ margin: "86px 0px 18px 0" }}>
    News- Headline From {capitalizeFirstLetter(category)} Category in {region}
   </h2>
   {loading && <Spinner />}
   <InfiniteScroll
    dataLength={articles.length}
    next={fetchMoreData}
    hasMore={articles.length !== totalResults}
    // loader={<Spinner />}
   >
    <div className="container">
     <div className="row">
      {error&&totalResults===0 ? (
       <div style={{ color: "red", textAlign: "center" }}>{errorMessage} results not found</div>
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
