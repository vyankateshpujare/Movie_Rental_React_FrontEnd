import axios from "axios";
import { useSelector } from "react-redux";
import * as actions from "../actions/actionType";

const apiEndPoint = process.env.REACT_APP_API_URL + "movies";

export const getAllMovies = (data) => (dispatch, getState) => {
  axios
    .post(apiEndPoint + "/pfs", data)
    .then((response) =>
      dispatch({
        type: actions.GET_ALL_MOVIES,
        payload: { movies: response.data },
      })
    )
    .catch((err) => console.log(err.message));
};

export const getCurrentMovie = (id) => (dispatch, getState) => {
  axios
    .get(apiEndPoint + "/" + id)
    .then((response) =>
      dispatch({
        type: actions.GET_CURRENT_MOVIE,
        payload: { movie: response.data },
      })
    )
    .catch((err) => console.log(err));
};

export const totalMovies = (data) => (dispatch, getState) => {
  axios
    .post(apiEndPoint + "/count", data)
    .then((response) =>
      dispatch({ type: actions.TOTAL_MOVIES, payload: response.data })
    )
    .catch((err) => console.log(err));
};

export const addMovie = (data) => (dispatch, getState) => {
  axios
    .post(
      apiEndPoint,
      {
        title: data.title,
        genreId: data.genre,
        dailyRentalRate: data.dailyRentalRate,
        numberInStock: data.numberInStock,
      },
      {
        headers: { "x-auth-token": getState().loginReducer.token },
      }
    )
    .then((response) =>
      dispatch({ type: actions.ADD_MOVIE, payload: { movie: response.data } })
    )
    .catch((err) => console.log(err.message));
};

export const updateMovie = (data) => (dispatch, getState) => {
  axios
    .put(
      apiEndPoint + "/" + data._id,
      {
        title: data.title,
        genreId: data.genre,
        dailyRentalRate: data.dailyRentalRate,
        numberInStock: data.numberInStock,
      },
      { headers: { "x-auth-token": getState().loginReducer.token } }
    )
    .then((response) =>
      dispatch({
        type: actions.UPDATE_MOVIE,
        payload: { movie: response.data },
      })
    )
    .catch((err) => console.log(err.message));
};

export const toggleLiked = (id) => (dispatch, getState) => {
  axios
    .patch(
      apiEndPoint + "/" + id,
      {},
      {
        headers: { "x-auth-token": getState().loginReducer.token },
      }
    )
    .then((response) =>
      dispatch({
        type: actions.TOGGLE_LIKED,
        payload: { movie: response.data },
      })
    )
    .catch((err) => console.log(err.message));
};

export const deleteMovie = (id) => (dispatch, getState) => {
  axios
    .delete(apiEndPoint + "/" + id, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) =>
      dispatch({
        type: actions.DELETE_MOVIE,
        payload: { movie: response.data },
      })
    )
    .catch((err) => console.log(err.message));
};
