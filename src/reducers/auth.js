import {
  PENDING,
  ERROR,
  FIRST_NAME_CHANGED,
  LAST_NAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  CONFIRM_PASSWORD_CHANGED,
  CLEAR_AUTH_FORM,
  AUTH_ERROR,
  AUTH_USER,
  LOGIN_USER,
  LOGOUT_USER,
  CREATE_USER,
  AUTH_MODAL,
  GET_USER,
  REGISTRATION_MODAL,
  LOGIN_MODAL,
} from '../actions/types';

const INITIAL_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  user: null,
  error: '',
  success: '',
  loading: false,
  showModal: false,
  showRegistration: false,
  userDetails: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, userDetails: action.payload };
    case AUTH_MODAL:
      return { ...state, showModal: action.payload };
    case LOGIN_MODAL:
      return { ...state, showRegistration: false };
    case REGISTRATION_MODAL:
      return { ...state, showModal: action.payload, showRegistration: action.payload };
    /*  Login / Registration Form Reducers  */
    case FIRST_NAME_CHANGED:
      return { ...state, firstName: action.payload };
    case LAST_NAME_CHANGED:
      return { ...state, lastName: action.payload };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case CONFIRM_PASSWORD_CHANGED:
      return { ...state, confirmPassword: action.payload };
    case CLEAR_AUTH_FORM:
      return {
        ...state,
        ...INITIAL_STATE,
        email: action.payload && action.payload.email ? state.email : INITIAL_STATE.email,
      };
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
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
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

    /*  Account Creation Reducers  */
    case CREATE_USER:
      switch (action.payload) {
        case PENDING:
          return { ...state, loading: true };
        case ERROR:
          return {
            ...state,
            error: 'Error creating user',
            loading: false,
          };
        default:
          return {
            ...state,
            success: 'Successfully created user',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            error: '',
            loading: false,
          };
      }
    default:
      return state;
  }
};
