import { createStore, applyMiddleware } from "redux";
import MainReducer from "./reducers";
import thunk from "redux-thunk";

export const store = createStore(MainReducer, applyMiddleware(thunk));