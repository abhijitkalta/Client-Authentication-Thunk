import {createStore, applyMiddleware} from 'redux';
import {throttle} from 'lodash';
import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';

import { loadState, saveState } from './localStorage';
import reducers from './reducers/index';
import { AUTH_USER } from './actions/types';

const configureStore = () => {
  const persistedState = loadState();
  const middlewares = [promise, reduxThunk];

  const store = createStore(reducers, persistedState, applyMiddleware(...middlewares));

  store.subscribe(throttle(() => {
    saveState(store.getState());
  }, 1000));

  const token = localStorage.getItem('token');
  if(token){
    store.dispatch({
      type: AUTH_USER
    });
  };

  return store;
};

export default configureStore;
