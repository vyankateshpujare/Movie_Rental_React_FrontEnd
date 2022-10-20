import * as actions from "../actions/actionType";

export const customerReducer = (state = { customers: [] }, action) => {
  switch (action.type) {
    case actions.GET_ALL_CUSTOMERS:
      return { ...state, customers: action.payload.customers };

    case actions.ADD_CUSTOMER:
      state.customers.push(action.payload.customer);
      return state;

    case actions.UPDATE_CUSTOMER:
      state.customers.map((c) => {
        if (c._id === action.payload.customer._id) {
          c.name = action.payload.customer.name;
          c.phone = action.payload.customer.phone;
          c.isGold = action.payload.customer.isGold;
          // c._id = action.payload.customer.c._id;
        }
      });
      return state;

    case actions.DELETE_CUSTOMER:
      const newCustomers = state.customers.filter(
        (c) => c._id !== action.payload.customer._id
      );
      return { ...state, customers: newCustomers };

    default:
      return state;
  }
};
