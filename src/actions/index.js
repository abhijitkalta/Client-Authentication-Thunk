import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';

const API_URL = 'http://localhost:3090';

export function signInUser({ email, password}){
  return function(dispatch){
    axios.post(`${API_URL}/signin`, {
      email: email,
      password: password
    })
    .then(response => {
      localStorage.setItem('token', response.data.token);
      dispatch({ type: AUTH_USER });
      browserHistory.push('/feature');
    })
    .catch((err) => {
      dispatch(authError('Bad login info'));
    });
  };
};

export function signUpUser({ email, password}){
  return function(dispatch){
    axios.post(`${API_URL}/signup`, {
      email: email,
      password: password
    })
    .then(response => {
      localStorage.setItem('token', response.data.token);
      dispatch({ type: AUTH_USER });
      browserHistory.push('/feature');
    })
    .catch(err => {
      dispatch(authError(err.response.data.error));
    });
  };
}

export function signOutUser(){
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  }
}

export function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error
  };
};

//redux-thunk approach
export function fetchMessage() {
  return function(dispatch){
    axios.get(API_URL, {
      headers: {
        authorization: localStorage.getItem('token')
      }
    })
    .then(response => {
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data.message
      })
    })
  }
};

//fetchmessage can be also implemented using reduxPromise approach
// export function fetchMessage(){
//   const request = axios.get(API_URL, {
//     headers: {
//       authorization: localStorage.getItem('token')
//     }
//   });
//
//   return {
//     type: FETCH_MESSAGE,
//     payload: request.data.message
//   };
// };
