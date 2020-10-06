import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import usersReducer from './store/reducers/users';

import App from './App';

import './index.css';

// const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer
});

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk)
));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
