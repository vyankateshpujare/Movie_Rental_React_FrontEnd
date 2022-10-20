import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

const composeEnhancers = composeWithDevTools({ trace: true });

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
