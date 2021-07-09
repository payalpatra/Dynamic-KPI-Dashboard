import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  authReducer,

} from "./reducers/authReducers";

import {usersReducer} from "./reducers/usersReducer"
const reducer = combineReducers({

  getAuth: authReducer,
  getUsers: usersReducer

});

const middleware = [thunk];


const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
