/* eslint-disable no-unneeded-ternary */
import { SNACKBAR } from '../actions/types';

const INITIAL_STATE = {
  snackbar: { variant: 'info', message: '' },
  showSnackbar: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SNACKBAR:
      return {
        ...state,
        snackbar: { variant: action.payload.variant || '', message: action.payload.variant || '' },
        showSnackbar: !action.payload ? false : true,
      };
    default:
      return state;
  }
};
