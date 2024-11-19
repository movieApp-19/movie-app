import { Routes, Route } from 'react-router-dom';
import './App.css';
import Showtimes from './showtimes/Showtimes.js';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Showtimes from './showtimes/Showtimes.js';
import SearchUI from "./screens/searchUI.js";
import Home from './Home/home.js'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" exact element={<Home />}/> 
      <Route path="/showtimes" exact={<Showtimes/>}/>
      <Route path="/search" element = {<SearchUI/>}/>
    </Routes>
    </>
  );
}

export default App;
