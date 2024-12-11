import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import './App.css';
import { BackgroundProvider } from "./context/BackgroundContext"; // Taustanhallinta
import Showtimes from './showtimes/Showtimes';
import SearchUI from './movieSearch/searchUI';
import UserProvider from './context/userProvider';
import NotFound from './notFound/notFound.js';
import RegisterUI, { AuthMode } from './register/registerUI.js';
import DeleteAccount from './deleteAccount/deleteAccount.js';
import Navbar from './components/Navbar.js';
import Home from './Home/home.js';
import UserProfile from "./profile/UserProfile.js"
import FanPage from './fanPage/fanPage.js';
import Favourites from "./favourites/Favourites.js"
import GroupPage from './fanPage/groupPage.js';

const router = createBrowserRouter([

  {
    errorElement: <NotFound />
  },

  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    )
  },

  {
    path: "/profile",
    element: (
      <>
        <Navbar />
        <UserProfile />
      </>
    )
  },

  {
    path: "/favourites/:userid",
    element: (
      <>
        <Navbar />
        <Favourites />
      </>
    )
  },

  {
    path: "/search",
    element: (
      <>
        <Navbar />
        <SearchUI />
      </>
    )
  },

  {
    path: "/showtimes",
    element: (
      <>
        <Navbar />
        <Showtimes />
      </>
    )
  },

  {
    path: "/signup",
    element: (
      <>
        <Navbar />
        <RegisterUI mode={AuthMode.Register} />
      </>
    )
  },

  {
    path: "/signin",
    element: (
      <>
        <Navbar />
        <RegisterUI mode={AuthMode.Login} />
      </>
    )
  },

  {
    path: "/delete-account",
    element: (
      <>
        <Navbar />
        <DeleteAccount />
      </>
    )
  },
  {
    path: "/fanpage",
    element: (
      <>
      <Navbar />
      <FanPage />
      </>
    )
  },

  {
    path: "/groupPage/:id",
    element: (
      <>
        <Navbar />
        <GroupPage />
      </>
    )
  }  
])


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <BackgroundProvider>
      <RouterProvider router={router} />
      </BackgroundProvider>
    </UserProvider>
  </React.StrictMode>
);