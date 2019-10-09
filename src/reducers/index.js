import { combineReducers } from 'redux';
import auth from './auth';
import view from './view';
import admin from './admin';

export default combineReducers({
  auth,
  view,
  admin,
});
