import { createStore} from "redux";
import MainReducer from "./reducers";

export const store = createStore(MainReducer);