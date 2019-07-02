import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

import TransportDetails from './TransportDetails'

import API from '../../api';
import snap from '../../../../back-end/src/api/snap';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  label: {
    color: blue
  },
  layout: {
    width: 'auto',
    background: "#42424240",
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
    background: "#21212150",
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
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
}));

const steps = ['Personal Details', 'Trip Details', 'Transportation Preferences', 'Confirm your Trip'];


const Checkout = (props) => {

  let dispMsg = (<Typography>____</Typography>);

  const toRender = [
    <PersonalDetailsForm />,
    <TripDetailsForm />,
    <TransportDetails />,
    <Slip />
  ]
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const isValidEmail = (email) => {
    return email.includes("@") && email.includes('.') && email.split('@').length > 1 && email.split('@')[1] !== "";
  }

  const handleNext = () => {
    if (activeStep == 0) {
      if (props.personalDetails.firstName === "" || props.personalDetails.lastName === "" || props.personalDetails.email === "" || props.personalDetails.country === "") {
        props.onError("Important Fields Are Empty!");
      } else if (!isValidEmail(props.personalDetails.email)) {
        props.onError("Oops doesnt look like a valid email address!");
      } else {
        props.onError("");
        setActiveStep(activeStep + 1);
      }
    } else if (activeStep == 1) {
      if ((props.tripDetails.numberMales + props.tripDetails.numberFemales) == 0) {
        props.onError("Total Guests cannot be 0");
      } else if (props.tripDetails.numberMales < 0 || props.tripDetails.numberFemales < 0) {
        props.onError("There cannot be Negative number of Guests!!");
      } else {
        props.onError("");
        setActiveStep(activeStep + 1);
      }
    } else if (activeStep == 3) {
      console.log(props.tripDetails.checkIn.toISOString())
      API.post('/accommodation/info', {
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

  /* Includes a callback to show snap loading, success, etc screens */
  const callSnap = () => {
    // snap.show(); // the snap loading screen
    handleTokenReq((error, snaptoken) => {
      if (error) {
        // snap.hide();
        console.log(error)
      } else {
        snap.pay(snapToken, {
          onSuccess: (result) => { console.log('success'); console.log(result); alert('Payment Success') },
          onPending: function (result) { console.log('pending'); console.log(result); alert('Payment Pending') },
          onError: function (result) { console.log('error'); console.log(result); alert('Payment Error') },
          onClose: function () {
            console.log('customer closed the popup without finishing the payment');
            alert('Please do not close the payment pop-up')
          }
        })
      }
    })
  }

  const handleTokenReq = (callback) => {
    const snapRes = getToken();
    if (snapRes.token) {
      callback(null, snapToken)
    } else if (snapRes.error_messages) {
      console.log(error_messages.map((err) => err)) // snap errors are stored in array
      callSnap(new Error('Unable to process payment, please try again later'), null)
    }
  }

  // get the token (or error) from the back-end
  const getToken = () => {
    API.post('/snap/info', {
      data: {
        "first_name": props.personalDetails.firstName,
        "last_name": props.personalDetails.lastName,
        "email": props.personalDetails.email,
        "gross_amount": props.personalDetails.grossAmount,
      }
    }).then((res) => {
      console.log(res);
      return res;
    }).catch((err) => {
      console.log(err);
    });
  }

  const theme = createMuiTheme({
    palette: {
      primary: blue
    }
  })

  return (
    <React.Fragment>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>

            <Typography className={classes.label} component="h1" variant="h4" align="center">
              Checkout
            </Typography>

            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step className={classes.label} key={label}>
                  <StepLabel className={classes.label}><p style={{ color: "white" }}>{label}</p></StepLabel>
                </Step>
              ))}
            </Stepper>

            <React.Fragment>

              {activeStep === steps.length ? (
                <React.Fragment>
                  {callSnap()}
                  <ConfirmationScreen email={props.personalDetails.email} grossAmount={props.grossAmount} />
                </React.Fragment>
              ) : (
                  <React.Fragment>
                    {toRender[activeStep]}
                    <Typography color="error" variant="h6">{props.errorMsg}</Typography>
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
    personalDetails: state.personalDetails,
    tripDetails: state.tripDetails,
    grossAmount: state.grossAmount,
    errorMsg: state.errorMsg
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onError: (val) => dispatch({ type: "ERR_MSG", payload: val }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
