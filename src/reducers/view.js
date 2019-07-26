/* eslint-disable no-unneeded-ternary */
import { SNACKBAR, SUBSCRIBE_MODAL, PAYMENT_MODAL } from '../actions/types';

const INITIAL_STATE = {
  snackbar: { variant: 'info', message: '' },
  showSnackbar: false,
  showSubscribeModal: false,
  showPaymentModal: false,
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SNACKBAR:
      return {
        ...state,
        snackbar: { variant: action.payload.variant || '', message: action.payload.variant || '' },
        showSnackbar: !action.payload ? false : true,
      };
    case SUBSCRIBE_MODAL:
      return { ...state, showSubscribeModal: action.payload };
    case PAYMENT_MODAL:
      return { ...state, showPaymentModal: action.payload };
    default:
      return state;
  }
};
