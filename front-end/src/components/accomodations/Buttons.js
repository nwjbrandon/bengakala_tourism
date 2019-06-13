import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {MuiThemeProvider ,createMuiTheme} from '@material-ui/core'
import red from '@material-ui/core/colors/blue'


const useStyles = makeStyles(theme => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const Buttons = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.buttons}>
      {props.activeStep !== 0 && (
        <Button color="primary" onClick={props.handleBack} className={classes.button}>
          Back
        </Button>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={props.handleNext}
        className={classes.button}
      >
        {props.activeStep === props.stepsLength - 1 ? 'Place order' : 'Next'}
      </Button>
    </div>
  );
}

export default Buttons;
