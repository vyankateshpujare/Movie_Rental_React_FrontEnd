import axios from "axios";
import * as actions from "../actions/actionType";

const apiEndPoint = process.env.REACT_APP_API_URL + "users";

export const registerUser = (user) => (dispatch, getState) => {
  axios
    .post(apiEndPoint, user)
    .then((response) =>
      dispatch({
        type: actions.REGISTER_USER,
        payload: { user: response.data },
      })
    )
    .catch((err) => console.log(err.message));
};
