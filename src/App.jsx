import './App.css';
import { useState } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
function App() {
  const size = 10;
  const apiKey = import.meta.env.VITE_API_KEY;
  const [progress, setProgress] = useState(0);

  const newProgress = (progress) => {
    setProgress(progress)
  }

  return (
    <>
      <Router>
        <LoadingBar
          loaderSpeed = "1500"
          color='#f11946'
          progress={progress}
        />
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<News newProgress={newProgress} apiKey={apiKey}  size={size}   category="top" />} ></Route >
          <Route exact path="/business" element={<News newProgress={newProgress} apiKey={apiKey} size={size}   category="business" />} ></Route >
          <Route exact path="/entertainment" element={<News newProgress={newProgress} apiKey={apiKey}  size={size}   category="entertainment" />} ></Route >
          <Route exact path="/health" element={<News newProgress={newProgress} apiKey={apiKey}  size={size}   category="health" />} />
          <Route exact path="/science" element={<News newProgress={newProgress} apiKey={apiKey}  size={size}   category="science" />} ></Route >
          <Route exact path="/sports" element={<News newProgress={newProgress} apiKey={apiKey}  size={size}   category="sports" />} ></Route >
          {/* const mySecret = process.env['REACT_APP_NEWS_API'] */}
          <Route exact path="/technology" element={<News newProgress={newProgress} apiKey={apiKey}  size={size}   category="technology" />} ></Route >
        </Routes>
      </Router>
    </>
  );
}

export default App;
