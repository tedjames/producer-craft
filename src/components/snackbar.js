import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

// Dialog Components
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
import { closeSnackbar } from '../actions';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

class SnackbarContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(event, reason) {
    const { closeSnackbar } = this.props;
    if (reason === 'clickaway') {
      return;
    }

    closeSnackbar();
  }

  render() {
    const { showSnackbar, variant, message } = this.props;
    const Icon = variantIcon[variant];
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={showSnackbar}
          autoHideDuration={6000}
          onClose={this.handleClose}
        >
          <SnackbarContent
            className={clsx(classes[variant])}
            aria-describedby="client-snackbar"
            message={(
<span id="client-snackbar" className={classes.message}>
                <Icon className={clsx(classes.icon, classes.iconVariant)} />
                {message}
              </span>
)}
          />
        </Snackbar>
      </div>
    );
  }
}

const mapStateToProps = ({ view }) => ({
  showSnackbar: view.showSnackbar,
  variant: view.snackbar.variant,
  message: view.snackbar.message,
});

export default connect(
  mapStateToProps,
  { closeSnackbar },
)(SnackbarContainer);
