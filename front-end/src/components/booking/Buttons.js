import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


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

  const btns = (props.activeStep === props.stepsLength - 1 ?
    (<div className={classes.buttons}>
      {props.activeStep !== 0 && (
        <Button variant="contained" color="primary" onClick={props.handleBack} className={classes.button}>
          Back
        </Button>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={props.handleCash}
        className={classes.button}
      >Pay by Cash</Button>
      <Button
        variant="contained"
        color="primary"
        disabled={true}
        onClick={props.handleCard}
        className={classes.button}
      >Pay by Credit Card</Button>
    </div>)
    :
    (<div className={classes.buttons}>
      {props.activeStep !== 0 && (
        <Button variant="contained" color="primary" onClick={props.handleBack} className={classes.button}>
          Back
        </Button>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={props.handleNext}
        className={classes.button}
      >Next</Button>

    </div>)


  );

  return (
    <React.Fragment>{btns}</React.Fragment>
  );
}

export default Buttons;
