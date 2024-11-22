import { Routes, Route } from 'react-router-dom';
import './App.css';
import Showtimes from './showtimes/Showtimes.js';
import SearchUI from "./screens/searchUI.js";
import Home from './Home/home.js';
import DeleteAccount from './Home/deleteAccount.js';
import Navbar from './Home/Navbar.js';
import RegisterUI, { AuthenticationMode } from './screens/registerUI.js';

function App() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signup" element={<RegisterUI authenticationMode={AuthenticationMode.Register} />} />
        <Route path="/showtimes" element={<Showtimes />} />
        <Route path="/search" element={<SearchUI />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
      </Routes>
    </>
  );
}

export default App;
