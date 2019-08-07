import React from 'react';
import MasterTable from './Tabular';
import MasterTableMobile from './TabularMobile';
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles';
import { Paper } from '@material-ui/core';
import calculator from './calculation'

import * as actionTypes from '../../actions/booking';

const useStyles = makeStyles(() => {
});

const App = (props) => {

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [calculationComplete, setCalculationComplete] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    setWindowWidth(window.innerWidth);
  }, []);


  React.useEffect(() => {


    const costBreakDown = calculator({
      tripDetails: props.tripDetails,
      cost: props.cost
    });

    props.onPriceUpdated(costBreakDown.price);
    console.log(costBreakDown.numberOfDays)
    props.onNumberOfDaysUpdated(costBreakDown.numberOfDays);
    setCalculationComplete(true);
    // setData(result.data);

  }, []);

  const classes = useStyles();

  return (
    <div className='flex-center container medium-border-surround'>
      <h1 style={{ fontFamily: "Montserrat, sans-serif", color: "white" }}>
        Here's your Order
        </h1>
      <div>
        <Paper>
          <Typography className={classes.label} variant="h6">
            {props.personalDetails.firstName} {props.personalDetails.lastName} from {props.personalDetails.country}
          </Typography>
          <Typography className={classes.label} variant="h6">
            {props.personalDetails.email}
          </Typography>
        </Paper>
        <div>
          {windowWidth > 600
            ? <MasterTable tripDetails={props.tripDetails} costData={props.cost} calcData={props.price} />
            : <MasterTableMobile tripDetails={props.tripDetails} costData={props.cost} calcData={props.price} />
          }
        </div>
        <Paper style={{ marginTop: 10, padding: 10 }}>
          <Typography align="left" style={{ fontSize: "10px", fontStyle: "bold" }} variant="h3">
            Disclaimer:
          </Typography>
          <Typography align="left" style={{ fontSize: "10px" }} variant="h6">
            1. For cancellations and failure to show-up, no refunds will be entertained.
          </Typography>
          <Typography align="left" style={{ fontSize: "10px" }} variant="h6">
            2.	For wrong input of information/special requests, please contact us via the website with your transaction number.
          </Typography>
          <Typography align="left" style={{ fontSize: "10px" }} variant="h6">
            3.	Please note that all Special Requests are subject to availability and additional charges may apply.
          </Typography>
          <Typography align="left" style={{ fontSize: "10px" }} variant="h6">
            4.	Your card issuer may charge you a foreign transaction fee.
          </Typography>
          <Typography align="left" style={{ fontSize: "10px" }} variant="h6">
            5.	Bengkala is a typical village, hotel standard facilities and standardised amenities should not be expected. Homes may differ as all guests will be staying in the villagers’ houses.
          </Typography>
        </Paper>



      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    personalDetails: state.booking.personalDetails,
    tripDetails: state.booking.tripDetails,
    cost: state.booking.cost,
    grossAmount: state.booking.grossAmount,
    price: state.booking.price,
    numberOfDays: state.booking.numberOfDays
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPriceUpdated: (val) => dispatch({ type: actionTypes.PAYMENT_CALC, payload: val }),
    onNumberOfDaysUpdated: (val) => dispatch({ type: actionTypes.NUMBER_OF_DAYS, payload: val }),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
