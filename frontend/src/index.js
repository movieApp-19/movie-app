import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Showtimes from './showtimes/Showtimes';
import SearchUI from './screens/searchUI';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserProvider from './context/userProvider';
import NotFound from './screens/notFound';
import RegisterUI, { AuthMode } from './screens/registerUI';
import DeleteAccount from './Home/deleteAccount';
import Navbar from './Home/Navbar';
import Home from './Home/home';

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
  }
])


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);