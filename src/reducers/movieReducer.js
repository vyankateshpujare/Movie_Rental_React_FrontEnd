import * as actions from "../actions/actionType";

export const movieReducer = (
  state = { movies: [], totalMovies: 0, currentMovie: {} },
  action
) => {
  switch (action.type) {
    case actions.GET_ALL_MOVIES:
      return { ...state, movies: action.payload.movies };

    case actions.GET_CURRENT_MOVIE:
      return { ...state, currentMovie: action.payload.movie };

    case actions.TOTAL_MOVIES:
      return { ...state, totalMovies: action.payload };

    case actions.ADD_MOVIE:
      state.movies.push(
        // title: action.payload.data.title,
        // genre: action.payload.data.genre,
        // dailyRentalRate: action.payload.data.dailyRentalRate,
        // numberInStock: action.payload.data.numberInStock,
        // _id:action.payload.data._id,
        action.payload.movie
      );
      return state;

    case actions.UPDATE_MOVIE:
      state.movies.map((m) => {
        if (m._id === action.payload.movie._id) {
          console.log(action.payload.movie);
          m.title = action.payload.movie.title;
          m.genre = action.payload.movie.genre;
          m.dailyRentalRate = action.payload.movie.dailyRentalRate;
          m.numberInStock = action.payload.movie.numberInStock;
          m._id = action.payload.movie._id;
          // m.liked = action.payload.data.liked;
        }
      });
      return state;

    case actions.TOGGLE_LIKED:
      const like = state.movies.map((m) => {
        if (m._id === action.payload.movie._id) {
          m.liked = m.liked ? false : true;
        }
        return m;
      });
      return { ...state, movies: like };

    case actions.DELETE_MOVIE:
      const newMovies = state.movies.filter(
        (m) => m._id !== action.payload.movie._id
      );
      return { ...state, movies: newMovies };

    default:
      return state;
  }
};
