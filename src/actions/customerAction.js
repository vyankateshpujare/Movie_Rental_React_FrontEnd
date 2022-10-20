import axios from "axios";
import * as actions from "../actions/actionType";

const apiEndPoint = process.env.REACT_APP_API_URL + "customers";

export const getAllCustomers = () => (dispatch, getState) => {
  axios
    .get(apiEndPoint)
    .then((response) =>
      dispatch({
        type: actions.GET_ALL_CUSTOMERS,
        payload: { customers: response.data },
      })
    )
    .catch((err) => console.log(err.message));
};

export const addCustomer = (data) => (dispatch, getState) => {
  axios
    .post(apiEndPoint, data, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) =>
      dispatch({
        type: actions.ADD_CUSTOMER,
        payload: { customer: response.data },
      })
    )
    .catch((err) => console.log(err.message));
};

export const updateCustomer = (data) => (dispatch, getState) => {
  const newData = { name: data.name, phone: data.phone, isGold: data.isGold };
  axios
    .put(apiEndPoint + "/" + data._id, newData, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) =>
      dispatch({
        type: actions.UPDATE_CUSTOMER,
        payload: { customer: response.data },
      })
    )
    .catch((err) => console.log(err.message));
};

export const deleteCustomer = (id) => (dispatch, getState) => {
  axios
    .delete(apiEndPoint + "/" + id, {
      headers: { "x-auth-token": getState().loginReducer.token },
    })
    .then((response) =>
      dispatch({
        type: actions.DELETE_CUSTOMER,
        payload: { customer: response.data },
      })
    )
    .catch((err) => console.log(err.message));
};
