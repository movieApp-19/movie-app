import { Routes, Route } from 'react-router-dom';
import './App.css';
import Showtimes from './showtimes/Showtimes.js';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" exact element={<Showtimes/>}/>
    </Routes>
    </>
  );
}

export default App;
