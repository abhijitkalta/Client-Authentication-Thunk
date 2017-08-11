import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from '../actions/types';
const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    case AUTH_USER:
      return {...state, authenticated: true, error: ''}
      break;
    case UNAUTH_USER:
      return {...state, authenticated: false}
      break;
    case AUTH_ERROR:
      return {...state, error: action.payload}
      break;
    case FETCH_MESSAGE:
      return {...state, message: action.payload}
      break;
    default:
      return state;
  }
}
