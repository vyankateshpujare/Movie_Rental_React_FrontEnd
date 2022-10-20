import axios from "axios";
import * as actions from "../actions/actionType";
const apiEndPoint = process.env.REACT_APP_API_URL + "login";

export const loginUser = (user) => (dispatch, getState) => {
  axios
    .post(apiEndPoint, user)
    .then((response) => {
      sessionStorage.setItem("token", response.data);
      dispatch({ type: actions.LOGIN_USER, payload: { token: response.data } });
    })
    .catch((err) => console.log(err.message));
};

export const loadLogin = () => ({
  type: actions.LOGIN_USER,
  payload: { token: sessionStorage.getItem("token") },
});
