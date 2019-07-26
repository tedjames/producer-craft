import { SNACKBAR, SUBSCRIBE_MODAL, PAYMENT_MODAL } from './types';

export const closeSnackbar = () => ({
  type: SNACKBAR,
  payload: false,
});

export const toggleSubscribeModal = payload => ({
  type: SUBSCRIBE_MODAL,
  payload,
});

export const togglePaymentModal = payload => ({
  type: PAYMENT_MODAL,
  payload,
});
