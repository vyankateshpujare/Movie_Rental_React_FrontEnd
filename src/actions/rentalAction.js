import axios from "axios";
import * as actions from "./actionType";

const apiEndPoint = process.env.REACT_APP_API_URL + "rentals";

export const getAllRentals = () => (dispatch, getState) => {
  axios
    .get(apiEndPoint)
    .then((response) =>
      dispatch({
        type: actions.GET_ALL_RENTALS,
        payload: { rentals: response.data },
      })
    )
    .catch((err) => console.log(err.message));
};

export const addRental = (data) => (dispatch, getState) => {
  axios
    .post(apiEndPoint, data, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) =>
      dispatch({ type: actions.ADD_RENTAL, payload: { rental: response.data } })
    )
    .catch((err) => console.log(err));
};

export const updateRental = (id) => (dispatch, getState) => {
  axios
    .patch(
      apiEndPoint + "/" + id,
      {},
      { headers: { "x-auth-token": getState().loginReducer.token } }
    )
    .then((response) =>
      dispatch({
        type: actions.UPDATE_RENTAL,
        payload: { rental: response.data },
      })
    )
    .catch((err) => console.log(err.message));
};

export const deleteRental = (id) => (dispatch, getState) => {
  axios
    .delete(apiEndPoint + "/" + id, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) =>
      dispatch({
        type: actions.DELETE_RENTAL,
        payload: { rental: response.data },
      })
    )
    .catch((err) => console.log(err));
};
