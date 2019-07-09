import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import MealCheckbox from './MealCheckbox'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

const Mealplan = (props) =>{
  const classes  = useStyles();

  return(
    <React.Fragment>
      <Grid item xs={12}>
      <Paper
       className={classes.root}
       >
        <Typography >
          Select Your Meal Plan
        </Typography>
        <Grid container spacing={3}>

          <MealCheckbox changed = {props.breakfastChange} checked = {props.breakfast} mealType = "Breakfast"/>
          <MealCheckbox changed = {props.lunchChange} checked = {props.lunch} mealType = "Lunch"/>
          <MealCheckbox changed = {props.dinnerChange} checked = {props.dinner} mealType = "Dinner"/>

        </Grid>
      </Paper>
      </Grid>

    </React.Fragment>
  );
}

export default Mealplan
