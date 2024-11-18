import { Routes, Route } from 'react-router-dom';
import './App.css';
import Showtimes from './showtimes/Showtimes.js';
import SearchUI from "./screens/searchUI.js";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" exact element={<Showtimes/>}/>
      <Route path="/search" element = {<SearchUI/>}/>
    </Routes>
    </>
  );
}

export default App;
