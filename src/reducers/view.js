/* eslint-disable no-unneeded-ternary */
import {
  SNACKBAR,
  SUBSCRIBE_MODAL,
  PAYMENT_MODAL,
  PAYMENT_LOADING,
  ACCOUNT_MODAL,
  ADD_COURSE_MODAL,
  EDIT_COURSE_MODAL,
  ADD_LESSON_MODAL,
  EDIT_LESSON_MODAL,
  ADD_FILE_MODAL,
  EDIT_FILE_MODAL,
  COURSE_SELECTED,
  LESSON_SELECTED,
  FETCH_COURSE,
  PENDING,
  ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  snackbar: { variant: 'info', message: '' },
  showSnackbar: false,
  selectedCourse: '',
  selectedLesson: false,
  showSubscribeModal: false,
  showPaymentModal: false,
  showAccountModal: false,
  paymentDetails: {
    productId: '',
    amount: '',
    productName: '',
    subscription: false,
  },
  productDetails: {
    productId: '',
    amount: '',
    productName: '',
  },
  loading: false,
  paymentLoading: false,
  // Admin Modals
  showAddCourseModal: false,
  showEditCourseModal: false,
  showAddLessonModal: false,
  showEditLessonModal: false,
  showAddFileModal: false,
  showEditFileModal: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_COURSE:
      switch (action.payload) {
        case PENDING:
          return { ...state, fetchingCourse: true };
        case ERROR:
          return { ...state, fetchingCourse: false };
        default:
          return {
            ...state,
            selectedCourse: action.payload,
            fetchingCourse: false,
          };
      }
    case SNACKBAR:
      return {
        ...state,
        snackbar: { variant: action.payload.variant || '', message: action.payload.variant || '' },
        showSnackbar: !action.payload ? false : true,
      };
    case SUBSCRIBE_MODAL:
      return {
        ...state,
        showSubscribeModal: action.payload ? true : false,
        productDetails: action.payload.productDetails || false,
      };
    case PAYMENT_MODAL:
      return {
        ...state,
        showPaymentModal: action.payload ? true : false,
        showSubscribeModal: false,
        paymentDetails: {
          productId: action.payload.productId || '',
          productName: action.payload.productName || '',
          amount: action.payload.amount || '',
          subscription: action.payload.subscription || false,
        },
      };
    case PAYMENT_LOADING:
      console.log('PAYMENT_LOADING REDUCER RUNNING');
      return { ...state, paymentLoading: action.payload };
    case ACCOUNT_MODAL:
      return { ...state, showAccountModal: action.payload || false };
    // Admin Modals
    case ADD_COURSE_MODAL:
      return { ...state, showAddCourseModal: action.payload || false };
    case EDIT_COURSE_MODAL:
      return { ...state, showEditCourseModal: action.payload || false };
    case ADD_LESSON_MODAL:
      return { ...state, showAddLessonModal: action.payload || false };
    case EDIT_LESSON_MODAL:
      return { ...state, showEditLessonModal: action.payload || false };
    case ADD_FILE_MODAL:
      return { ...state, showAddFileModal: action.payload || false };
    case EDIT_FILE_MODAL:
      return { ...state, showEditFileModal: action.payload || false };
    case COURSE_SELECTED:
      return { ...state, selectedCourse: action.payload };
    case LESSON_SELECTED:
      return { ...state, selectedLesson: action.payload };
    default:
      return state;
  }
};
