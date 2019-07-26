import { combineReducers } from 'redux';
import auth from './auth';
import view from './view';

export default combineReducers({
  auth,
  view,
});
