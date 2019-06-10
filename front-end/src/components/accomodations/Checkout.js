import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Review from './Review';
import TripDetailsForm from './TripDetailsForm'
import PersonalDetailsForm from './PersonalDetailsForm'
import ConfirmationScreen from './ConfirmationScreen'
import Slip from './Slip'
import {MuiThemeProvider ,createMuiTheme} from '@material-ui/core'
import red from '@material-ui/core/colors/blue'


const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  label:{
    color: "white"
  },
  layout: {
    width: 'auto',
    background:"#42424240",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    background:"#21212150",
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
    background:"#21212100",
    color: "white"
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Personal Details', 'Trip Details', 'Confirm your Trip'];


const Checkout = (props) => {

  const toRender = [
    <PersonalDetailsForm  {...props.alldata.personalDetails}/>,
    <TripDetailsForm  {...props.alldata.tripDetails}/>,
    <Review />
  ]
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };


  const theme = createMuiTheme({
    palette: {
      primary: red
    }
  })

  return (
    <React.Fragment>
      <MuiThemeProvider theme = {theme}>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>

            <Typography className={classes.label} component="h1" variant="h4" align="center">
              Checkout
            </Typography>

            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel className={classes.label}>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <React.Fragment>

              {activeStep === steps.length ? (

                <ConfirmationScreen />

              ) : (

                <React.Fragment>
                  {toRender[activeStep]}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                    </Button>
                  </div>
                </React.Fragment>

              )}

            </React.Fragment>
          </Paper>
        </main>
      </MuiThemeProvider>

    </React.Fragment>
  );
}

export default Checkout
