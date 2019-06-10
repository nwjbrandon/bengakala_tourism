import React from 'react'
import Grid from '@material-ui/core/Grid';
import { KeyboardDatePicker} from '@material-ui/pickers'
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    background: "white",
    borderColor: "white",
    borderRadius: "2px"
  },
  input: {
    color: "black",

  }
};


const Datepicker = (props) =>{
  const { classes } = props;

  return(

    <Grid item xs={12} sm={6}>
      <KeyboardDatePicker
        label={props.datelabel}
        // disablePast = {true}
        // className={classes.label}
        className={classes.root}
        InputProps={{
          className: classes.input
        }}
        value={props.val}
        onChange={props.changed}
        format="DD/MM/YYYY"
        fullWidth
        shouldDisableDate = {(date) => {
          return (props.min  >= date);
       }}
      />
    </Grid>

  );
}

export default withStyles(styles)(Datepicker);
