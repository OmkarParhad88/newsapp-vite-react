import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react'
import Nevbar from './Components/Navbar'
import countries from './country.json'
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App = () => {
  const pageSize = 6;
  const apiKey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0);
  const [country, setCountry] = useState("IN");
  const [countryTitle, setCountryTitle] = useState('India');


  const newProgress = (progress) => {
    setProgress(progress)
  }
  const handleSelect = (e) => {
    const selected = countries.find(c => c.code === e)
    if (selected) {
      setCountryTitle(selected.name)
      setCountry(e);
      // console.log(e)
      
    }

  }
  return (
      <div>
        <Router>
          <LoadingBar
            color='#f11946'
            progress={progress}
          />
        <Nevbar country={handleSelect} countryTitle={countryTitle} />
          <Routes>
          <Route exact path="/" element={<News newProgress={newProgress} apiKey={apiKey} key="general" pageSize={pageSize} country={country} category="general" reload={countryTitle} />} ></Route >
          <Route path="/business" element={<News newProgress={newProgress} apiKey={apiKey} key="business" pageSize={pageSize} country={country} category="business" reload={countryTitle} />} ></Route >
          <Route exact path="/entertainment" element={<News newProgress={newProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country={country} category="entertainment" reload={countryTitle} />} ></Route >
          <Route exact path="/health" element={<News newProgress={newProgress} apiKey={apiKey} key="health" pageSize={pageSize} country={country} category="health" reload={countryTitle} />} />
          <Route exact path="/science" element={<News newProgress={newProgress} apiKey={apiKey} key="science" pageSize={pageSize} country={country} category="science" reload={countryTitle} />} ></Route >
          <Route exact path="/sports" element={<News newProgress={newProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country={country} category="sports" reload={countryTitle} />} ></Route >
          <Route exact path="/technology" element={<News newProgress={newProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country={country} category="technology" reload={countryTitle} />} ></Route >
          </Routes>
        </Router>
      </div>
    )
}

export default App