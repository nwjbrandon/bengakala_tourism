import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { green } from '@material-ui/core/colors';

const styles = () => ({
  root: {
    display: 'flex',
  },
  success: {
    background: green[500],
  },
});

class SuccessSnackBar extends Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    const { close } = this.props;
    close();
  }

  render() {
    const { classes, open, message } = this.props;

    return (
      <div className={classes.root}>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          ContentProps={{
            classes: {
              root: classes.success
            }
          }}
          open={open}
          autoHideDuration={6000}
          message={<span id="message-id">{ message }</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
        />
      </div>
    );
  }
}

SuccessSnackBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SuccessSnackBar);