import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import * as actionTypes from '../../actions/accomodation';
import Datespicker from './DatesPicker'
import Mealplan from './Mealplan'
import Guests from './GuestsSelect.js'
import { connect } from 'react-redux'


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  label: {
    color: "white"
  }
}));


const TripDetailsForm = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography className={classes.label} variant="h6" gutterBottom>
        Enter Your Trip Details
      </Typography>
      <Grid container spacing={3}>
        <Datespicker excludeDates={[new Date('2019-06-26T03:24:00'), new Date('2019-06-30T03:24:00'), new Date('2019-07-11T03:24:00')]} checkInChange={(date) => props.checkInChange(date)} checkOutChange={(date) => props.checkOutChange(date)} checkIn={props.tripDetails.checkIn} checkOut={props.tripDetails.checkOut} />

        <Mealplan
          breakfastChange={props.breakfastChange} lunchChange={props.lunchChange} dinnerChange={props.dinnerChange}
          breakfast={props.tripDetails.breakfast} lunch={props.tripDetails.lunch} dinner={props.tripDetails.dinner}
        />

        <Guests malechanged={(e) => props.onMaleChange(e.target.value)} femalechanged={(e) => props.onFemaleChange(e.target.value)} males={props.tripDetails.numberMales} females={props.tripDetails.numberFemales} />

      </Grid>
    </React.Fragment>
  );
}



const mapStateToProps = state => {
  return {
    tripDetails: state.booking.tripDetails,
    excludeDates: state.booking.excludeDates
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMaleChange: (val) => dispatch({ type: actionTypes.MALES, payload: val }),
    onFemaleChange: (val) => dispatch({ type: actionTypes.FEMALES, payload: val }),
    onCarChange: (val) => dispatch({ type: actionTypes.CARS, payload: val }),
    onVanChange: (val) => dispatch({ type: actionTypes.VANS, payload: val }),
    onBikeChange: (val) => dispatch({ type: actionTypes.BIKES, payload: val }),
    breakfastChange: () => dispatch({ type: actionTypes.BREAKFAST }),
    lunchChange: () => dispatch({ type: actionTypes.LUNCH }),
    dinnerChange: () => dispatch({ type: actionTypes.DINNER }),
    checkInChange: (date) => dispatch({ type: actionTypes.CHECK_IN, payload: date }),
    checkOutChange: (date) => dispatch({ type: actionTypes.CHECK_OUT, payload: date }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TripDetailsForm);
