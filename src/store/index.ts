import { applyMiddleware, compose, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";

import { logger } from "@middleware/index";
import rootReducer from "@reducers/index";

export function configureStore(initialState?): Store<any> {
  let middleware = applyMiddleware(logger);
  let composeEnhancers: any = compose;
  if (process.env.NODE_ENV !== "production") {
    middleware = composeWithDevTools(middleware);
    composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
  }

  // tslint:disable-next-line:no-shadowed-variable
  const store = createStore(
    rootReducer as any,
    initialState as any,
    composeEnhancers(applyMiddleware(...getMiddlewares()))
  ) as Store<any>;

  return store as any;
}

export const store = configureStore();

function getMiddlewares() {
  const middlewares = [thunk, promise];
  return middlewares;
}
