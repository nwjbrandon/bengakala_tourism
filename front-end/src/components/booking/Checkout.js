import React, { useEffect } from 'react';
import { Prompt } from 'react-router'
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
import PendingScreen from './PendingScreen'
import Slip from './Slip'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import blue from '@material-ui/core/colors/blue'
import Buttons from './Buttons'
import { connect } from 'react-redux'
import * as actionTypes from '../../actions/booking';
import CloseIcon from '@material-ui/icons/Close';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import TransportDetails from './TransportDetails'
import IconButton from '@material-ui/core/IconButton';
import API from '../../api';
import uuidv1 from 'uuid/v1';


// import callSnap from './snapPayment'
const snap = window.snap;

const useStyles = makeStyles(theme => ({
  label: {
    color: "white",
    fontFamily: "Montserrat, sans-serif",
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

const steps = ['Trip Details', 'Personal Details', 'Transportation Preferences', 'Confirm your Trip'];


const Checkout = (props) => {


  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [openSnackBar, setSnackBar] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [isPending, setPending] = React.useState(false);
  const [cashPayment, setCashPayment] = React.useState(0);
  const [orderID, setOrderID] = React.useState("undef");
  const [booked, setBookedData] = React.useState([]);
  const [isLoadingCash, setLoadingCash] = React.useState(false);
  const [isLoadingCard, setLoadingCard] = React.useState(false);

  const [transportNeeded, setTransportNeeded] = React.useState(false);
  const [airportTransportNeeded, setAirportTransportNeeded] = React.useState(false);

  const toRender = [
    <TripDetailsForm />,
    <PersonalDetailsForm />,
    <TransportDetails setNeeded={setTransportNeeded} transportNeeded={transportNeeded} setAirportNeeded={setAirportTransportNeeded} airportTransportNeeded={airportTransportNeeded} />,
    <Slip />
  ];

  useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    setWindowWidth(window.innerWidth);
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      const result = await API.get('/booking/info');
      const cost = result.data.cost;
      const excludeDates = result.data.excludedDates;
      const costObj = {};
      cost.map((item) => {
        const keyval = Object.keys(item)[0].toString().toLowerCase();
        costObj[keyval] = item[Object.keys(item)[0].toString()];
      });
      props.updateCost(costObj);
      console.log("COST BRO", costObj);

      props.updateDates(excludeDates);
      console.log(result.data.booked)
      setBookedData([...result.data.booked]);

    };

    fetchData();
  }, []);

  useEffect(() => {
    const onUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', onUnload);

    return () => {
      window.removeEventListener('beforeunload', onUnload);
    }
  }, []);

  //Publishes data to database and sends email if necessary
  const publishToBackend = (orderID, tokenID, cashOrNot) => {

    API.post('/sendEmail', {
      toEmail: props.personalDetails.email,
      personalDetails: props.personalDetails,
      tripDetails: props.tripDetails,
      cost: props.cost,
      prices: props.price,
      orderId: orderID,
      transactionID: tokenID,
      numberOfDays: props.numberOfDays,
      orderStatus: cashOrNot

    }).then(res => {
      if (res.data === 'pending') {
        setPending(true);
      }

      setActiveStep(activeStep + 1);
      setLoadingCash(false);
      setLoadingCard(false);
    });

  };


  //Calls snap payment backend
  const callSnap = async () => {
    snap.show();
    const res = await getToken();
    const snapToken = res.data.snapToken;
    const orderUID = res.data.order_id;
    setOrderID(orderUID);

    if (snapToken) {
      snap.pay(snapToken, {
        onSuccess: (result) => {
          publishToBackend(orderUID, result.transaction_id, 1);
        },
        on8Pending: (result) => {
          publishToBackend(orderUID, result.transaction_id, 1);
          setPending(true)
        },
        onError: (result) => {
          alert('Payment Error, please try again')
        },
        onClose: () => {
          alert('Please press the place order button to retry credit card payment');
        },
      })
    } else {
      snap.hide();
    }
    setLoadingCard(false);
  };

  //Gets Token from backEnd
  const getToken = async () => {
    const { personalDetails, price } = props;
    const res = await API.post('/snap/info', {

      'first_name': personalDetails.firstName,
      'last_name': personalDetails.lastName,
      'email': personalDetails.email,
      'gross_amount': price.subTotal,

    });

    if (res) {
      setOrderID(res.order_id);
      return res;
    } else {
      return null;
    }

  };

  //Ensures Check in and checkout date window does not include excluded Dates
  const excludedDatesEngulfed = () => {
    const checkIn = new Date(props.tripDetails.checkIn);
    const checkOut = new Date(props.tripDetails.checkOut);
    const result = props.excludeDates.find((item) => {
      const currDate = new Date(item);
      return (currDate >= checkIn && currDate <= checkOut);
    });

    return result;
  };

  const fallsWithinWindow = () => {

  }

  //Get Maximum Occupancy for the check in and check put dates chosen
  const fullyBookedDateChosen = () => {
    const checkIn = new Date(props.tripDetails.checkIn);

    const checkOut = new Date(props.tripDetails.checkOut);

    checkOut.setHours(0,0,0);
    checkIn.setHours(0,0,0);

    const fallswithin = booked.filter((item) => {
      const itemDate = new Date(item.date);

      itemDate.setHours(0,0,0);

      return (itemDate >= checkIn && itemDate <= checkOut);
    });

    let maxFullDays = 0;
    let maxFullDate = null;

    fallswithin.forEach((item) => {
      const itemDate = new Date(item.date);
      if (maxFullDays < item.counts) {
        maxFullDays = item.counts;
        maxFullDate = itemDate;
      }
    });

    return { maxFullDate, maxFullDays }

  };

  //Disallows stays more than _ month long
  const isTooLong = () => {
    const checkIn = new Date(props.tripDetails.checkIn);
    const checkOut = new Date(props.tripDetails.checkOut);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 30) {
      return true
    } else {
      return false
    }

  }

  //Checks if email looks Valid
  const isValidEmail = (email) => {
    return email.includes("@") && email.includes('.') && email.split('@').length > 1 && email.split('@')[1] !== "";
  };

  //Constructs Readble String from Date object
  const constructStringDate = (date) => {
    const DateObj = date ? new Date(date) : new Date();
    const str = `${DateObj.getFullYear()}-${DateObj.getMonth() + 1}-${DateObj.getDate()}`;
    return str
  };

  //Validates Personal Information
  const handlePersonalInfo = () => {
    if (props.personalDetails.firstName === "") {
      props.onError("Please input your first name!");
      setSnackBar(true);
    } else if (props.personalDetails.lastName === "") {
      props.onError("Please input your last name!");
      setSnackBar(true);
    } else if (props.personalDetails.email === "") {
      props.onError("Please input your email!");
      setSnackBar(true);
    } else if (props.personalDetails.country === "") {
      props.onError("Please input the country you are from!");
      setSnackBar(true);
    } else if (!isValidEmail(props.personalDetails.email)) {
      props.onError("Oops doesnt look like a valid email address!");
      setSnackBar(true);
    } else {
      props.onError("");
      setSnackBar(false);
      setActiveStep(activeStep + 1);
    }
  }

  //Validates Trip Information
  const handleTripInfo = () => {

    if (props.tripDetails.numberMales < 0 || props.tripDetails.numberFemales < 0) {
      props.onError("There cannot be negative number of guests!!");
      setSnackBar(true);
    } else if ((props.tripDetails.numberMales + props.tripDetails.numberFemales) === 0) {
      props.onError("Total Guests cannot be 0");
      setSnackBar(true);
    } else if (isTooLong()) {
      props.onError("Sorry your trip is too long! For trips longer than 1 month contact us directly");
      setSnackBar(true);
    } else if ((props.tripDetails.numberMales + props.tripDetails.numberFemales) > 30) {
      props.onError("Sorry we are unable to accommodate more than 30 people.");
      setSnackBar(true);
    } else if (excludedDatesEngulfed()) {
      props.onError("Sorry, we are not able to accommodate you on some dates that you have Chosen. Please reselect check in and check out dates.");
      setSnackBar(true);
    } else {
      const { maxFullDate, maxFullDays } = fullyBookedDateChosen();
      if ((props.tripDetails.numberMales + props.tripDetails.numberFemales) > (30 - maxFullDays)) {
        props.onError(`Sorry we do not have enough slots on ${constructStringDate(maxFullDate)} please reselect your check in and check out Dates`);
        setSnackBar(true);
      } else {
        props.onError("");
        setSnackBar(false);
        setActiveStep(activeStep + 1);
      }
    }

  }

  //Validates Transport Information
  const handleTransportInfo = () => {
    if (props.tripDetails.numberVans < 0 || props.tripDetails.numberCars < 0 || props.tripDetails.numberBikes < 0 || props.tripDetails.numberAirportCars < 0) {
      props.onError("There cannot be Negative number of Vehicles!!");
      setSnackBar(true);
    } else {
      props.onError("");
      setSnackBar(false);
      setActiveStep(activeStep + 1);
    }
  }

  //Input Validator
  // Handles Next Button
  const handleNext = () => {
    if (activeStep === 1) {
      handlePersonalInfo();
    } else if (activeStep === 0) {
      handleTripInfo();
    } else if (activeStep === 2) {
      handleTransportInfo();
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  //Handles Cash Payment
  const handleCash = () => {
    if (activeStep === 3) {
      setLoadingCash(true);
      const uuid = uuidv1();
      setOrderID(uuid);
      publishToBackend("", uuid, 0);
    }
  };

  //Handles Online Payment
  const handleCard = () => {
    if (activeStep === 3) {
      setLoadingCard(true);
      setCashPayment(1);
      callSnap();
    }
  };

  //Handles Back Button
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
      <Prompt
        when={activeStep > 0}
        message={location =>
          location.pathname.startsWith("/booking")
            ? "Please use the 'Back' and 'Next' buttons to navigate within the booking page"
            : 'There are unsaved changes, Are you sure you want to leave the page?'}
      />
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>

            <Typography className={classes.label} component="h1" variant="h4" align="center">
              Come Stay With Us
            </Typography>

            {windowWidth < 600 ? MStepper : normalStepper}


            <React.Fragment>

              {activeStep === steps.length ? (
                <React.Fragment>
                  {isPending ? (
                    <PendingScreen email={props.personalDetails.email} />
                  ) : (
                      <ConfirmationScreen
                        email={props.personalDetails.email}
                        cashPayment={cashPayment}
                        numberOfDays={props.numberOfDays}
                        orderId={orderID}
                        cost={props.cost}
                        personalDetails={props.personalDetails}
                        tripDetails={props.tripDetails}
                        price={props.price} />)}
                </React.Fragment>)
                : (
                  <React.Fragment>
                    {toRender[activeStep]}
                    <Snackbar
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
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
                    <Buttons
                      style={{ fontFamily: "Montserrat, sans-serif", }}
                      activeStep={activeStep}
                      handleBack={handleBack}
                      handleCash={handleCash}
                      handleCard={handleCard}
                      handleNext={handleNext}
                      transactionStateCash={isLoadingCash}
                      transactionStateCard={isLoadingCard}
                      stepsLength={steps.length} />

                  </React.Fragment>
                )}

            </React.Fragment>
          </Paper>
        </main>
      </MuiThemeProvider>
    </React.Fragment>
  );
};



const mapStateToProps = state => {
  return {
    personalDetails: state.booking.personalDetails,
    tripDetails: state.booking.tripDetails,
    cost: state.booking.cost,
    price: state.booking.price,
    errorMsg: state.booking.errorMsg,
    numberOfDays: state.booking.numberOfDays,
    excludeDates: state.booking.excludeDates
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onError: (val) => dispatch({ type: actionTypes.ERR_MSG, payload: val }),
    updateCost: (val) => dispatch({ type: actionTypes.LOAD_COST, payload: val }),
    updateDates: (val) => dispatch({ type: actionTypes.LOAD_DATES, payload: val })
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
