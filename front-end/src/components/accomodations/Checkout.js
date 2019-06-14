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
import Buttons from './Buttons'
import {connect} from 'react-redux'

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

  let dispMsg = (<Typography>____</Typography>);

  const toRender = [
    <PersonalDetailsForm/>,
    <TripDetailsForm />,
    <Slip />
  ]
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if(activeStep == 0){
        if(props.personalDetails.firstName === "" || props.personalDetails.lastName ==="" || props.personalDetails.email === "" || props.personalDetails.country === ""){
          props.onError("Important Fields Are Empty!");
        }else{
          props.onError("");
          setActiveStep(activeStep + 1);
        }
    }else if(activeStep == 1){
        if((props.tripDetails.numberMales + props.tripDetails.numberFemales) == 0){
          // dispMsg = (<Typography>Please Fill in All details!!</Typography>);
          props.onError("Total Guests cannot be 0");
        }else{
          props.onError("");
          setActiveStep(activeStep + 1);
        }
    }
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
                  <Typography color="error" variant="h6">{props.errorMsg}</Typography>
                  <Buttons activeStep = {activeStep} handleBack = {handleBack} handleNext = {handleNext} stepsLength = {steps.length}/>

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
  return{
    personalDetails:state.personalDetails,
    tripDetails:state.tripDetails,
    errorMsg:state.errorMsg
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onError: (val) => dispatch({type:"ERR_MSG" , payload:val}),
  }
}

export default connect(mapStateToProps ,mapDispatchToProps)(Checkout);
