import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Datespicker from './DatesPicker'
import Mealplan from './Mealplan'
import NumberSelector from './NumberSelector'

import Guests from './GuestsSelect.js'


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  label:{
    color: "white"
  }
}));


export default function AddressForm() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography className={classes.label}  variant="h6" gutterBottom>
        Enter Your Trip Details
      </Typography>
      <Grid container spacing={3}>
        <Datespicker />

        <Mealplan />

        <Guests />

        <Grid item xs={12}>
          <Paper className={classes.root}>
            <Typography >
              Select Your Vehicles
            </Typography>
            <Grid container spacing={3}>
              <NumberSelector division = {4} label = "Cars"/>
              <NumberSelector division = {4} label = "Vans"/>
              <NumberSelector division = {4} label = "MotorBikes"/>
            </Grid>
          </Paper>
        </Grid>

      </Grid>
    </React.Fragment>
  );
}
