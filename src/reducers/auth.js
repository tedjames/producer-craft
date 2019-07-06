import {
  PENDING,
  ERROR,
  NAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  COMPANY_CHANGED,
  POSITION_CHANGED,
  CLEAR_AUTH_FORM,
  AUTH_ERROR,
  AUTH_USER,
  LOGIN_USER,
  LOGOUT_USER,
  REQUEST_ACCOUNT,
} from '../actions/types';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  company: '',
  position: '',
  user: null,
  error: '',
  success: '',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    /*  Login / Registration Form Reducers  */
    case NAME_CHANGED:
      return { ...state, name: action.payload };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case COMPANY_CHANGED:
      return { ...state, company: action.payload };
    case POSITION_CHANGED:
      return { ...state, position: action.payload };
    case CLEAR_AUTH_FORM:
      return { ...state, ...INITIAL_STATE };
    case AUTH_ERROR:
      return { ...state, error: action.payload };

    /*  Authentication Reducers  */
    case AUTH_USER:
      switch (action.payload) {
        case PENDING:
          return { ...state, loading: true };
        case ERROR:
          return { ...state, error: 'Error authorizing user', loading: false };
        default:
          return {
            ...state,
            success: 'Successfully authorized user',
            user: action.payload,
            loading: false,
          };
      }
    case LOGIN_USER:
      switch (action.payload) {
        case PENDING:
          return { ...state, loading: true };
        case ERROR:
          return { ...state, error: 'Error logging in user', loading: false };
        default:
          return {
            ...state,
            success: 'Successfully logged in',
            user: action.payload,
            name: '',
            email: '',
            password: '',
            company: '',
            position: '',
            error: '',
            loading: false,
          };
      }
    case LOGOUT_USER:
      switch (action.payload) {
        case PENDING:
          return { ...state, loading: true };
        case ERROR:
          return { ...state, error: 'Error logging out user', loading: false };
        default:
          return {
            ...state,
            success: 'Successfully logged out',
            user: null,
            loading: false,
          };
      }

    /*  Account Registration Reducers  */
    case REQUEST_ACCOUNT:
      switch (action.payload) {
        case PENDING:
          return { ...state, loading: true };
        case ERROR:
          return {
            ...state,
            error: 'Error requesting account',
            loading: false,
          };
        default:
          return {
            ...state,
            success: 'Successfully submitted registration',
            name: '',
            email: '',
            password: '',
            company: '',
            position: '',
            error: '',
            loading: false,
          };
      }
    default:
      return state;
  }
};
