import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import NumberSelector from './NumberSelector'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

const Guestselect = (props) =>{
  const classes  = useStyles();

  return(
    <React.Fragment>
      <Grid item xs={12}>
      <Paper
       className={classes.root}
       >
        <Typography >
          Select Your Guest Count
        </Typography>
        <Grid container spacing={3}>

          <NumberSelector changed = {props.malechanged} value = {props.males} division = {6} label = "Number of Males"/>
          <NumberSelector changed = {props.femalechanged}  value = {props.females} division = {6} label = "Number of Females"/>


        </Grid>
      </Paper>
      </Grid>

    </React.Fragment>
  );
}

export default Guestselect
