import './App.css';
import React, { useState } from 'react'
import Nevbar from './Components/Navbar'
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

  const [progress, setProgress] = useState(0)

  const newProgress = (progress) => {
    setProgress(progress)
  }
  return (
      <div>
        <Router>
          <LoadingBar
            color='#f11946'
            progress={progress}
          />
          <Nevbar />
          <Routes>
            <Route exact path="/" element={<News newProgress={newProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" />} ></Route >
            <Route path="/business" element={<News newProgress={newProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business" />} ></Route >
            <Route exact path="/entertainment" element={<News newProgress={newProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment" />} ></Route >
            <Route exact path="/health" element={<News newProgress={newProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health" />} />
            <Route exact path="/science" element={<News newProgress={newProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science" />} ></Route >
            <Route exact path="/sports" element={<News newProgress={newProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports" />} ></Route >
            <Route exact path="/technology" element={<News newProgress={newProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology" />} ></Route >
          </Routes>
        </Router>
      </div>
    )
}

export default App