import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home";
import Customer from "./components/customers";
import Genre from "./components/genres";
import Movie from "./components/movies";
import Rental from "./components/rentals";
import Login from "./components/login";
import Register from "./components/registers";
import { Provider } from "react-redux";
import store from "./store";
import AddGenre, { genreLoader } from "./components/addUpdateGenre";
import AddMovie, { movieLoader } from "./components/addUpdateMovie";
import AddCustomer, { customerLoader } from "./components/addUpdateCustomer";
import AddRental from "./components/addRental";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "customers/addCustomer",
        element: <AddCustomer />,
      },
      {
        path: "customers/:customerId",
        element: <AddCustomer />,
        loader: customerLoader,
      },
      {
        path: "customers",
        element: <Customer />,
      },
      {
        path: "genres/addGenre",
        element: <AddGenre />,
      },
      {
        path: "genres/:genreId",
        element: <AddGenre />,
        loader: genreLoader,
      },
      {
        path: "genres",
        element: <Genre />,
      },
      {
        path: "movies/addMovie",
        element: <AddMovie />,
      },
      {
        path: "movies/:movieId",
        element: <AddMovie />,
        loader: movieLoader,
      },
      {
        path: "movies",
        element: <Movie />,
      },
      {
        path: "rentals",
        element: <Rental />,
      },
      {
        path: "rentals/addRental",
        element: <AddRental />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
