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
import ImageCarousell from './ImageCarousell/ImageCarousell'

// import callSnap from './snapPayment'
const snap = window.snap;

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
  const [isPending, setPending] = React.useState(false);
  const [cashPayment, setCashPayment] = React.useState(true);
  const [orderID, setOrderID] = React.useState("undef");
  const [booked, setBookedData] = React.useState([]);

  useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    setWindowWidth(window.innerWidth);
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      const result = await API.get('/booking/info');
      console.log(result.data)

      const cost = result.data.cost;
      const excludeDates = result.data.excludedDates;
      const costObj = {};
      cost.map((item) => {
        const keyval = Object.keys(item)[0].toString().toLowerCase();
        costObj[keyval] = item[Object.keys(item)[0].toString()]
      })
      props.updateCost(costObj);

      props.updateDates(excludeDates);
      setBookedData([...result.data.booked])


      console.log(excludeDates)
    };

    fetchData();
  }, []);

  useEffect(() => {
    const onUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    }
    window.addEventListener('beforeunload', onUnload);

    return () => {
      window.removeEventListener('beforeunload', onUnload);
    }
  }, []);

  const isValidEmail = (email) => {
    return email.includes("@") && email.includes('.') && email.split('@').length > 1 && email.split('@')[1] !== "";
  };

  const constructStringDate = (date) => {
    const DateObj = date ? new Date(date) : new Date();
    const str = `${DateObj.getFullYear()}-${DateObj.getMonth() + 1}-${DateObj.getDate()}`
    console.log(str)
    return str
  }

  const publishToBackend = (tokenID, cashOrNot) => {
    console.log("orderID", tokenID)
    API.post('/booking/info', {
      data: {
        "uuid": tokenID,
        "firstName": props.personalDetails.firstName,
        "lastName": props.personalDetails.lastName,
        "email": props.personalDetails.email,
        "country": props.personalDetails.country,
        "dateFrom": constructStringDate(props.tripDetails.checkIn),
        "dateTo": constructStringDate(props.tripDetails.checkOut),
        "males": props.tripDetails.numberMales,
        "females": props.tripDetails.numberFemales,
        "cars": props.tripDetails.numberCars,
        "van": props.tripDetails.numberVans,
        "breakfast": (props.tripDetails.breakfast),
        "lunch": (props.tripDetails.lunch),
        "dinner": (props.tripDetails.dinner),
        "motorbikes": props.tripDetails.numberBikes,
        "createdAt": constructStringDate(),
        "checkedIn": false,
        "cash": cashOrNot
      }
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err)
    });
  }

  const callSnap = async () => {
    snap.show();
    console.log('handling token request like a boss')
    const res = await getToken();
    const snapToken = res.data.snapToken
    const orderUID = res.data.order_id
    setOrderID(orderUID)
    console.log("IDS", { snapToken, orderUID })

    if (snapToken) {
      console.log('calling snap pay')
      snap.pay(snapToken, {
        onSuccess: (result) => {
          console.log("result", result)
          setActiveStep(activeStep + 1);
          publishToBackend(orderUID, false);
          console.log('success'); console.log(result);
        },
        onPending: (result) => {
          // console.log('pending'); console.log(result);
          // publishToBackend(orderUID, false);
          // setActiveStep(activeStep + 1)
          // setPending(true)
        },
        onError: (result) => { console.log('error'); console.log(result); alert('Payment Error, please try again') },
        onClose: () => {

          console.log('customer closed the popup without finishing the payment');
          alert('Please press the place order button to retry credit card payment');
        },
      })

    } else {
      snap.hide();
      // console.log(error)
    }
  }


  const getToken = async () => {
    const { personalDetails, price } = props
    console.log('getting token from backend')
    const res = await API.post('/snap/info', {

      'first_name': personalDetails.firstName,
      'last_name': personalDetails.lastName,
      'email': personalDetails.email,
      'gross_amount': price.subTotal,

    });

    console.log("Response", res)
    if (res) {
      setOrderID(res.order_id);
      return res;
    } else {
      return null;
    }

  }
  const excludedDatesEngulfed = () => {
    const checkIn = new Date(props.tripDetails.checkIn);
    const checkOut = new Date(props.tripDetails.checkOut);
    const result = props.excludeDates.find((item) => {
      const currDate = new Date(item)
      return (currDate >= checkIn && currDate <= checkOut);
    })

    return result;
  }
  const fullyBookedDateChosen = () => {
    const checkIn = new Date(props.tripDetails.checkIn);
    const checkOut = new Date(props.tripDetails.checkOut);
    console.log(checkIn)
    console.log(checkOut)
    let maxFullDays = 0;
    let maxFullDate = null;
    console.log("Booked", booked)
    const fallswithin = booked.filter((item) => {
      const itemDate = new Date(item.date)

      return (itemDate >= checkIn && itemDate <= checkOut);
    });

    console.log("falls within", fallswithin);

    fallswithin.forEach((item) => {
      const itemDate = new Date(item.date)
      if (maxFullDays < item.counts) {
        maxFullDays = item.counts;
        maxFullDate = itemDate;

      }

    });

    return { maxFullDate, maxFullDays }

  }

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
      if (props.tripDetails.numberMales < 0 || props.tripDetails.numberFemales < 0) {
        props.onError("There cannot be Negative number of Guests!!");
        setSnackBar(true);
      } else if ((props.tripDetails.numberMales + props.tripDetails.numberFemales) === 0) {
        props.onError("Total Guests cannot be 0");
        setSnackBar(true);
      } else if ((props.tripDetails.numberMales + props.tripDetails.numberFemales) > 30) {
        props.onError("Sorry we are unable to accommodate more than 30 people.");
        setSnackBar(true);
      } else if (excludedDatesEngulfed()) {
        props.onError("Sorry, we are not able to accommodate you on some dates that you have Chosen. Please reselect check in and check out dates.");
        setSnackBar(true);
      } else {
        const { maxFullDate, maxFullDays } = fullyBookedDateChosen();
        console.log("TESTING DATE QUOTA", maxFullDate, maxFullDays)
        if ((props.tripDetails.numberMales + props.tripDetails.numberFemales) > (30 - maxFullDays)) {
          props.onError(`Sorry we do not have enough slots on ${constructStringDate(maxFullDate)} please reselect your check in and check out Dates`);
          setSnackBar(true);
        } else {
          props.onError("");
          setSnackBar(false);
          setActiveStep(activeStep + 1);
        }


      }
    } else if (activeStep === 2) {

      if (props.tripDetails.numberVans < 0 || props.tripDetails.numberCars < 0 || props.tripDetails.numberBikes < 0) {
        props.onError("There cannot be Negative number of Vehicles!!");
        setSnackBar(true);
      } else {
        props.onError("");
        setSnackBar(false);
        setActiveStep(activeStep + 1);
      }
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleCash = () => {
    if (activeStep === 3) {

      const uuid = uuidv1();
      setOrderID(uuid)

      publishToBackend(uuid, true);

      setActiveStep(activeStep + 1);
    }
  }

  const handleCard = () => {
    if (activeStep === 3) {
      setCashPayment(false);

      callSnap();

      // setActiveStep(activeStep + 1);
    }
  }

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
        when={true}
        message={'There are unsaved changes, Are your sure you want to leave the page?'}
      />
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
                  {isPending ? (
                    <PendingScreen email={props.personalDetails.email} />
                  ) : (
                      <ConfirmationScreen
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
                      activeStep={activeStep}
                      handleBack={handleBack}
                      handleCash={handleCash}
                      handleCard={handleCard}
                      handleNext={handleNext}
                      stepsLength={steps.length} />

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
    cost: state.booking.cost,
    price: state.booking.price,
    grossAmount: state.booking.grossAmount,
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
