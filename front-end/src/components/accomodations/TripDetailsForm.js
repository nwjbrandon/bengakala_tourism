import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Datespicker from './DatesPicker'
import Mealplan from './Mealplan'
import NumberSelector from './NumberSelector'

import Guests from './GuestsSelect.js'

import {connect} from 'react-redux'


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  label:{
    color: "white"
  }
}));


const TripDetailsForm = (props) => {
  const classes = useStyles();


  return (
    <React.Fragment>
      <Typography className={classes.label}  variant="h6" gutterBottom>
        Enter Your Trip Details
      </Typography>
      <Grid container spacing={3}>
        <Datespicker checkInChange = {(date) => props.checkInChange(date)} checkOutChange = {(date) => props.checkOutChange(date)} checkIn = {props.tripDetails.checkIn} checkOut = {props.tripDetails.checkOut}/>

        <Mealplan
        breakfastChange = {props.breakfastChange}  lunchChange = {props.lunchChange} dinnerChange = {props.dinnerChange}
        breakfast = {props.tripDetails.breakfast} lunch = {props.tripDetails.lunch} dinner = {props.tripDetails.dinner}
         />

        <Guests malechanged = {(e)=>props.onMaleChange(e.target.value)} femalechanged = {(e)=>props.onFemaleChange(e.target.value)} males ={props.tripDetails.numberMales} females = {props.tripDetails.numberFemales}/>

        <Grid item xs={12}>
          <Paper className={classes.root}>
            <Typography >
              Select Your Vehicles
            </Typography>

            <Grid container spacing={3}>
              <NumberSelector changed = {(e)=>props.onCarChange(e.target.value)} value = {props.tripDetails.numberCars} division = {4} label = "Cars"/>
              <NumberSelector changed = {(e)=>props.onVanChange(e.target.value)} value = {props.tripDetails.numberVans} division = {4} label = "Vans"/>
              <NumberSelector changed = {(e)=>props.onBikeChange(e.target.value)} value = {props.tripDetails.numberBikes} division = {4} label = "MotorBikes"/>
            </Grid>
          </Paper>
        </Grid>

      </Grid>
    </React.Fragment>
  );
}



const mapStateToProps = state => {
  return{
    tripDetails:state.tripDetails,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMaleChange: (val) => dispatch({type:"MALES" , payload:val}),
    onFemaleChange: (val) => dispatch({type:"FEMALES" , payload:val}),
    onCarChange: (val) => dispatch({type:"CARS" , payload:val}),
    onVanChange: (val) => dispatch({type:"VANS" , payload:val}),
    onBikeChange: (val) => dispatch({type:"BIKES" , payload:val}),
    breakfastChange: () => dispatch({type:"BREAKFAST"}),
    lunchChange:() => dispatch({type:"LUNCH"}),
    dinnerChange :() => dispatch({type:"DINNER"}),
    checkInChange: (date) => dispatch({type:"CHECK_IN" , payload:date}),
    checkOutChange: (date) => dispatch({type:"CHECK_OUT" , payload:date}),
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(TripDetailsForm);
