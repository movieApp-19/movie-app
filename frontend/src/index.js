import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Showtimes from './showtimes/Showtimes';
import SearchUI from './screens/searchUI';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserProvider from './context/userProvider';
import NotFound from './screens/notFound';
import RegisterUI, { AuthenticationMode } from './screens/registerUI';
import DeleteAccount from './Home/deleteAccount';

const router = createBrowserRouter([

  {
    errorElement: <NotFound />
  },

  {
    path: "/",
    element: <App />
  },

  {
    path: "/search",
    element: <SearchUI />
  },

  {
    path: "/showtimes",
    element: <Showtimes />
  },

  {
    path: "/signup",
    element: <RegisterUI authenticationMode={AuthenticationMode.Register} />,
  },

  {
    path: "/delete-account",
    element: <DeleteAccount />
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

