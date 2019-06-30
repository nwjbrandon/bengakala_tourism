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

  const {personalDetails, tripDetails, cost} = props;

  return (
    <div className='flex-center container medium-border-surround'>
      <Typography className={classes.label} variant="h4">
        Here's your invoice
        </Typography>
      <div>
        <Typography className={classes.label} variant="h6">
          {personalDetails.firstName} {personalDetails.lastName} from {personalDetails.country}
        </Typography>
        <Typography className={classes.label} variant="h6">
          {personalDetails.email}
        </Typography>
        <div>
          <Typography className={classes.label} variant="h5">
            Price Breakdown
            </Typography>
          <MasterTable tripDetails={tripDetails} cost={cost} />
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
  };
};


export default connect(mapStateToProps)(App)
