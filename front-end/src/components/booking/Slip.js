import React from 'react';
import MasterTable from './Tabular';
import MasterTableMobile from './TabularMobile';
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles';
import { Paper } from '@material-ui/core';
import API from '../../api'

import * as actionTypes from '../../actions/accomodation';

const useStyles = makeStyles(() => {
});

const App = (props) => {

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
  const [calculationComplete, setCalculationComplete] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("resize", () => setWindowWidth(window.innerWidth));
    setWindowWidth(window.innerWidth);
  }, []);


  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await API.post('booking/calculate', {
  //       data: {
  //         tripDetails: props.tripDetails,
  //         cost: props.cost
  //       }
  //     })
  //     props.onPriceUpdated(result.data);
  //     setCalculationComplete(true);
  //     // setData(result.data);
  //   };

  //   fetchData();
  // }, []);

  const classes = useStyles();

  return (
    <div className='flex-center container medium-border-surround'>
      <Typography className={classes.label} variant="h4">
        Here's your Order
        </Typography>
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
          <Typography className={classes.label} variant="h5">
            Price Breakdown
            </Typography>
          {windowWidth > 600 ?

            <MasterTable calcState={calculationComplete} tripDetails={props.tripDetails} cost={props.cost} grossAmount={props.grossAmount} /> :
            <MasterTableMobile calcState={calculationComplete} tripDetails={props.tripDetails} cost={props.cost} grossAmount={props.grossAmount} />
          }

        </div>
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
    price: state.booking.price
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPriceUpdated: (val) => dispatch({ type: actionTypes.PAYMENT_CALC, payload: val }),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
