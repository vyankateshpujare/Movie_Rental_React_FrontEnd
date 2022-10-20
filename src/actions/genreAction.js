import axios from "axios";
import * as actions from "../actions/actionType";

const apiEndPoint = process.env.REACT_APP_API_URL + "genres";

export const getAllGenres = (data) => (dispatch, getState) => {
  axios
    .post(apiEndPoint + "/pfs", data)
    .then((response) =>
      dispatch({
        type: actions.GET_ALL_GENRES,
        payload: { genres: response.data },
      })
    )
    .catch((err) => console.log(err.message));
};

export const getCurrentGenre = (id) => (dispatch) => {
  axios
    .get(apiEndPoint + "/" + id)
    .then((response) =>
      dispatch({
        type: actions.GET_CURRENT_GENRE,
        payload: { currentGenre: response.data },
      })
    )
    .catch((err) => console.log(err));
};

export const totalGenre = () => (dispatch) => {
  axios
    .get(apiEndPoint + "/count")
    .then((response) =>
      dispatch({ type: actions.TOTAL_GENRES, payload: response.data })
    )
    .catch((err) => console.log(err));
};

export const addGenre = (data) => (dispatch, getState) => {
  axios
    .post(apiEndPoint, data, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) =>
      dispatch({ type: actions.ADD_GENRE, payload: { genre: response.data } })
    )
    .catch((err) => console.log(err.message));
};

export const updateGenre = (data) => (dispatch, getState) => {
  axios
    .put(
      apiEndPoint + "/" + data._id,
      { name: data.name },
      {
        headers: { "x-auth-token": getState().loginReducer.token },
      }
    )
    .then((response) =>
      dispatch({
        type: actions.UPDATE_GENRE,
        payload: { genre: response.data },
      })
    )
    .catch((err) => console.log(err.message));
};

export const deleteGenre = (id) => (dispatch, getState) => {
  axios
    .delete(apiEndPoint + "/" + id, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) =>
      dispatch({
        type: actions.DELETE_GENRE,
        payload: { genre: response.data },
      })
    )
    .catch((err) => console.log(err.message));
};
