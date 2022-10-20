import * as actions from "../actions/actionType";

export const genreReducer = (
  state = { genres: [], totalGenre: 0, currentGenre: {} },
  action
) => {
  switch (action.type) {
    case actions.GET_ALL_GENRES:
      return { ...state, genres: action.payload.genres };

    case actions.GET_CURRENT_GENRE:
      return { ...state, currentGenre: action.payload.currentGenre };

    case actions.TOTAL_GENRES:
      return { ...state, totalGenre: action.payload };

    case actions.ADD_GENRE:
      // const addGenre = state.genres.push(action.payload.genre);
      return { ...state, genres: [...state.genres, action.payload.genre] };

    case actions.UPDATE_GENRE:
      const updateGenre = state.genres.map((g) => {
        if (g._id === action.payload.genre._id) {
          g.name = action.payload.genre.name;
          g._id = action.payload.genre._id;
        }
        return g;
      });
      return { ...state, genres: updateGenre };

    case actions.DELETE_GENRE:
      const newGenres = state.genres.filter(
        (g) => g._id !== action.payload.genre._id
      );
      return { ...state, genres: newGenres };

    default:
      return state;
  }
};
