import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import TripDetailsForm from './TripDetailsForm'
import PersonalDetailsForm from './PersonalDetailsForm'
import ConfirmationScreen from './ConfirmationScreen'
import Slip from './Slip'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import blue from '@material-ui/core/colors/blue'
import Buttons from './Buttons'
import { connect } from 'react-redux'
import * as actionTypes from '../../actions/accomodation';
import CloseIcon from '@material-ui/icons/Close';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import TransportDetails from './TransportDetails'
import IconButton from '@material-ui/core/IconButton';
import API from '../../api';

const useStyles = makeStyles(theme => ({
  label: {
    color: blue
  },
  layout: {
    width: 'auto',
    maxWidth: '900px',
    background: "#42424240",
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    background: "#21212150",
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    background: "#21212100",
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
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
}));

const steps = ['Personal Details', 'Trip Details', 'Transportation Preferences', 'Confirm your Trip'];


const Checkout = (props) => {

  const toRender = [
    <PersonalDetailsForm />,
    <TripDetailsForm />,
    <TransportDetails />,
    <Slip />
  ];
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [openSnackBar, setSnackBar] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    setWindowWidth(window.innerWidth);
  }, []);

  const isValidEmail = (email) => {
    return email.includes("@") && email.includes('.') && email.split('@').length > 1 && email.split('@')[1] !== "";
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (props.personalDetails.firstName === "" || props.personalDetails.lastName === "" || props.personalDetails.email === "" || props.personalDetails.country === "") {
        props.onError("Important Fields Are Empty!");
        setSnackBar(true);
      } else if (!isValidEmail(props.personalDetails.email)) {
        props.onError("Oops doesnt look like a valid email address!");
        setSnackBar(true);
      } else {
        props.onError("");
        setSnackBar(false);
        setActiveStep(activeStep + 1);
      }
    } else if (activeStep === 1) {
      if ((props.tripDetails.numberMales + props.tripDetails.numberFemales) === 0) {
        props.onError("Total Guests cannot be 0");
        setSnackBar(true);
      } else if (props.tripDetails.numberMales < 0 || props.tripDetails.numberFemales < 0) {
        props.onError("There cannot be Negative number of Guests!!");
        setSnackBar(true);
      } else {
        props.onError("");
        setSnackBar(false);
        setActiveStep(activeStep + 1);
      }
    } else if (activeStep === 3) {
      // console.log(props.tripDetails.checkIn.toISOString())
      API.post('/booking/info', {
        data: {
          "firstName": props.personalDetails.firstName,
          "lastName": props.personalDetails.lastName,
          "email": props.personalDetails.email,
          "country": props.personalDetails.country,
          "dateFrom": "2019-01-29",
          "dateTo": "2019-01-29",
          "males": props.tripDetails.numberMales,
          "females": props.tripDetails.numberFemales,
          "cars": props.tripDetails.numberCars,
          "van": props.tripDetails.numberVans,
          "breakfast": (props.tripDetails.breakfast ? 1 : 0),
          "lunch": (props.tripDetails.lunch ? 1 : 0),
          "dinner": (props.tripDetails.dinner ? 1 : 0),
          "motorbikes": props.tripDetails.numberBikes,
          "createdAt": "2019-01-29",
        }
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err)
      });
      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const BorderLinearProgress = withStyles({
    root: {
      height: 10,
    },
    bar: {
      borderRadius: 20,
    },
  })(LinearProgress);


  const theme = createMuiTheme({
    palette: {
      primary: blue
    }
  });

  const MStepper = (<BorderLinearProgress
    className={classes.margin}
    variant="determinate"
    color="primary"
    value={activeStep * 100 / 4} />
  );

  const normalStepper = (<Stepper activeStep={activeStep} className={classes.stepper}>
    {steps.map(label => (
      <Step className={classes.label} key={label}>
        <StepLabel className={classes.label}><p style={{ color: "white" }}>{label}</p></StepLabel>
      </Step>
    ))}
  </Stepper>);

  return (
    <React.Fragment>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>

            <Typography className={classes.label} component="h1" variant="h4" align="center">
              Checkout
            </Typography>

            {windowWidth < 600 ? MStepper : normalStepper}


            <React.Fragment>

              {activeStep === steps.length ? (
                <React.Fragment>
                  <ConfirmationScreen personalDetails={props.personalDetails} grossAmount={props.grossAmount} />
                </React.Fragment>
              ) : (
                  <React.Fragment>
                    {toRender[activeStep]}
                    <Snackbar
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                      open={openSnackBar}
                      autoHideDuration={3000}
                      onClose={() => setSnackBar(false)}
                    >
                      <SnackbarContent
                        style={
                          { backgroundColor: 'red' }
                        }
                        aria-describedby="client-snackbar"
                        message={
                          <span id="client-snackbar" >
                            {props.errorMsg}
                          </span>
                        }
                        action={[
                          <IconButton key="close" aria-label="Close" color="inherit" onClick={() => setSnackBar(false)}>
                            <CloseIcon />
                          </IconButton>,
                        ]}
                      />
                    </Snackbar>
                    <Buttons activeStep={activeStep} handleBack={handleBack} handleNext={handleNext} stepsLength={steps.length} />

                  </React.Fragment>
                )}

            </React.Fragment>
          </Paper>
        </main>
      </MuiThemeProvider>

    </React.Fragment>
  );
}



const mapStateToProps = state => {
  return {
    personalDetails: state.booking.personalDetails,
    tripDetails: state.booking.tripDetails,
    grossAmount: state.booking.grossAmount,
    errorMsg: state.booking.errorMsg
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onError: (val) => dispatch({ type: actionTypes.ERR_MSG, payload: val }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
