/*  API Request States  */
export const PENDING = 'PENDING';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';

/*  Form Error Handling  */
export const FORM_ERROR = 'FORM_ERROR';
export const CLEAR_FORM_ERROR = 'CLEAR_FORM_ERROR';
export const ADMIN_FORM_ERROR = 'FORM_ERROR';

/*  Authentication  */
export const NAME_CHANGED = 'NAME_CHANGED';
export const USERNAME_CHANGED = 'USERNAME_CHANGED';
export const EMAIL_CHANGED = 'EMAIL_CHANGED';
export const PASSWORD_CHANGED = 'PASSWORD_CHANGED';
export const CONFIRM_PASSWORD_CHANGED = 'CONFIRM_PASSWORD_CHANGED';
export const CLEAR_AUTH_FORM = 'CLEAR_AUTH_FORM';
export const ADMIN_MODE = 'ADMIN_MODE';
export const REGISTER_MODAL = 'REGISTER_MODAL';

export const AUTH_USER = 'AUTH_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const REQUEST_ACCOUNT = 'REQUEST_ACCOUNT';
export const AUTH_ERROR = 'AUTH_ERROR';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const FORGOT_PASSWORD_MODAL = 'FORGOT_PASSWORD_MODAL';
export const AUTH_MODAL = 'AUTH_MODAL';
export const LOGIN_MODAL = 'LOGIN_MODAL';

/* Payment & Subscribe Modals */
export const SUBSCRIBE_MODAL = 'SUBSCRIBE_MODAL';
export const PAYMENT_MODAL = 'PAYMENT_MODAL';
export const PAYMENT_LOADING = 'PAYMENT_LOADING';

/*  User Management  */
export const ACCOUNT_MODAL = 'ACCOUNT_MODAL';
export const CREATE_USER = 'CREATE_USER';
export const GET_USERS = 'GET_USERS';
export const GET_USER = 'GET_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

/*  Registration Management  */
export const GET_REGISTRATIONS = 'GET_REGISTRATIONS';
export const DELETE_REGISTRATION = 'DELETE_REGISTRATION';

// user + registration form
export const USER_NAME_CHANGED = 'USER_NAME_CHANGED';
export const USER_EMAIL_CHANGED = 'USER_EMAIL_CHANGED';
export const USER_POSITION_CHANGED = 'USER_POSITION_CHANGED';
export const USER_COMPANY_CHANGED = 'USER_COMPANY_CHANGED';
export const USER_IS_ADMIN_CHANGED = 'USER_IS_ADMIN_CHANGED';

export const SET_USER_FORM = 'SET_USER_FORM';
export const CLEAR_USER_FORM = 'CLEAR_USER_FORM';
export const ADMIN_ERROR = 'ADMIN_ERROR';

/*  Common View Management  */
export const SNACKBAR = 'SNACKBAR';
export const MENU_MODAL = 'MENU_MODAL';

/*  Admin Modals  */
export const USER_MODAL = 'USER_MODAL';
export const REGISTRATION_MODAL = 'REGISTRATION_MODAL';

/* Course / Lesson Management */
export const ADD_COURSE_MODAL = 'ADD_COURSE_MODAL';
export const EDIT_COURSE_MODAL = 'EDIT_COURSE_MODAL';
export const ADD_LESSON_MODAL = 'ADD_LESSON_MODAL';
export const EDIT_LESSON_MODAL = 'EDIT_LESSON_MODAL';
export const ADD_FILE_MODAL = 'ADD_FILE_MODAL';
export const EDIT_FILE_MODAL = 'EDIT_FILE_MODAL';
