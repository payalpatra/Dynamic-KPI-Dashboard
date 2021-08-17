import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { authReducer } from "./reducers/authReducers";
import { usersReducer } from "./reducers/usersReducer"
import { messagesReducer } from "./reducers/messageReducers";
import { customerReducer } from "./reducers/customerReducer"

const reducer = combineReducers({
  getAuth: authReducer,
  getUsers: usersReducer,
  getMessages: messagesReducer,
  getCustomers: customerReducer,
});

const middleware = [thunk];


const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
