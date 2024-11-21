import { Routes, Route } from 'react-router-dom';
import './App.css';
import Showtimes from './showtimes/Showtimes.js';
import SearchUI from "./movieSearch/searchUI.js";
import Home from './Home/home.js';
import DeleteAccount from './deleteAccount/deleteAccount.js';
import Navbar from './components/Navbar.js';
import NotFound from './notFound/notFound.js';

function App() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/showtimes" element={<Showtimes />} />
        <Route path="/search" element={<SearchUI />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
