import { SNACKBAR } from './types';

export const closeSnackbar = () => ({
  type: SNACKBAR,
  payload: false,
});
