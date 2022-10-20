import * as actions from "../actions/actionType";

export const loginReducer = (state = { token: "" }, action) => {
  switch (action.type) {
    case actions.LOGIN_USER:
      console.log(action.payload.token);
      return (state = { token: action.payload.token });

    default:
      return state;
  }
};
