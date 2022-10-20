import * as actions from "../actions/actionType";

export const rentalReducer = (state = { rentals: [] }, action) => {
  switch (action.type) {
    case actions.GET_ALL_RENTALS:
      return { ...state, rentals: action.payload.rentals };

    case actions.ADD_RENTAL:
      return { ...state, rentals: [...state.rentals, action.payload.rental] };

    case actions.UPDATE_RENTAL:
      state.rentals.map((m) => {
        if (m._id === action.payload.rental._id) {
          m = action.payload.rental;
        }
        return m;
      });
      return (state = { rentals: [...state.rentals] });

    case actions.DELETE_RENTAL:
      const newRental = state.rentals.filter(
        (r) => r._id !== action.payload.rental._id
      );
      return { ...state, rentals: newRental };
      
    default:
      return state;
  }
};
