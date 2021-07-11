import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { authReducer } from "./reducers/authReducers";
import { usersReducer } from "./reducers/usersReducer"
import { graphReducers } from "./reducers/graphReducers"

const reducer = combineReducers({
  getAuth: authReducer,
  getUsers: usersReducer,
  getgraphs: graphReducers
});

const middleware = [thunk];


const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
