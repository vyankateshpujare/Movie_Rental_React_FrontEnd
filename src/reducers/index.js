import { combineReducers } from "redux";
import {genreReducer} from "./genreReducer";
import { movieReducer } from "./movieReducer";
import { customerReducer } from "./customerReducer";
import { registerReducer } from "./registerReducer";
import { loginReducer } from "./loginReducer";
import { rentalReducer } from "./rentalReducer";

export default combineReducers({genreReducer,movieReducer,customerReducer,registerReducer,loginReducer,rentalReducer});