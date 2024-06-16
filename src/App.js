
import './App.css';

// import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'
import Nevbar from './Components/Navbar'
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'
import countries from './country.json'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  const size = 10;
  const apiKey = process.env.REACT_APP_API_KEY;
  const [progress, setProgress] = useState(0);
  const [country, setCountry] = useState("in");
  const [countryTitle, setCountryTitle] = useState('India');


  const newProgress = (progress) => {
    setProgress(progress)
  }

  const handleSelect = (e) => {
    const selected = countries.find(c => c.code === e)
    if (selected) {
      setCountryTitle(selected.country)
      setCountry(e);
    }
  }

  return (
    <>
      <Router>
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Nevbar country={handleSelect} countryTitle={countryTitle} />
        <Routes>
          <Route exact path="/" element={<News newProgress={newProgress} apiKey={apiKey}  size={size} country={country} category="top" />} ></Route >
          <Route exact path="/business" element={<News newProgress={newProgress} apiKey={apiKey} size={size} country={country} category="business" />} ></Route >
          <Route exact path="/entertainment" element={<News newProgress={newProgress} apiKey={apiKey}  size={size} country={country} category="entertainment" />} ></Route >
          <Route exact path="/health" element={<News newProgress={newProgress} apiKey={apiKey}  size={size} country={country} category="health" />} />
          <Route exact path="/science" element={<News newProgress={newProgress} apiKey={apiKey}  size={size} country={country} category="science" />} ></Route >
          <Route exact path="/sports" element={<News newProgress={newProgress} apiKey={apiKey}  size={size} country={country} category="sports" />} ></Route >
          const mySecret = process.env['REACT_APP_NEWS_API']
          <Route exact path="/technology" element={<News newProgress={newProgress} apiKey={apiKey}  size={size} country={country} category="technology" />} ></Route >
        </Routes>
      </Router>
    </>
  );
}

export default App;
