import React, { Component } from 'react';
import MasterTable from './Tabular';
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles';



/* a fake customer */
// const personalDetails = {
//   firstName: "John",
//   lastName:"Doe",
//   email: "fake@gmail.com",
//   country: "fakeCountry",
// };

const useStyles = makeStyles(theme => {
  label: {
    color: "white"
  }
})

const App = (props) => {

  const classes = useStyles();

  return (
    <div className='flex-center container medium-border-surround'>
      <Typography className={classes.label} variant="h4">
        Here's your invoice
        </Typography>
      <div>
        <Typography className={classes.label} variant="h6">
          {props.personalDetails.firstName} {props.personalDetails.lastName} from {props.personalDetails.country}
        </Typography>
        <Typography className={classes.label} variant="h6">
          {props.personalDetails.email}
        </Typography>
        <div>
          <Typography className={classes.label} variant="h5">
            Price Breakdown
            </Typography>
          <MasterTable tripDetails={props.tripDetails} cost={props.cost} grossAmount={props.grossAmount} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    personalDetails: state.personalDetails,
    tripDetails: state.tripDetails,
    cost: state.cost,
    grossAmount: state.grossAmount,  
  };
};


export default connect(mapStateToProps)(App)
