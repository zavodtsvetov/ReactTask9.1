import { createStore } from "redux";
import { combineReducers } from "redux";
import { flagsReducer, toDoReducers } from "./reducers/index";
import { thunk } from "redux-thunk";
import { applyMiddleware } from "redux";

export const reducer = combineReducers({
  todos: toDoReducers,
  flags: flagsReducer,
});
export const store = createStore(reducer, applyMiddleware(thunk));
