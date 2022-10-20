import * as actions from "../actions/actionType";

export const registerReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case actions.REGISTER_USER:
      return { users: [...state.users, action.payload.user] };

    default:
      return state;
  }
};
