import { createStore, combineReducers, applyMiddleware, Reducer } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./Modules/user";
import collect from "./Modules/collect";

const env = process.env.NODE_ENV;

const history = createBrowserHistory();

const middlewares = [thunk, routerMiddleware(history)];

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const reducer: Reducer = combineReducers({
  router: connectRouter(history),
  user,
  collect
});

const store = (initialState?: any) =>
  createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)));

export { history };
export default store();
