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
    color: "white",

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
        placeholder="10/10/2018"
        value={new Date()}
        onChange={date =>{}}
        format="DD/MM/YYYY"
        fullWidth
        shouldDisableDate = {(date) => {
          return (new Date()  >= date);
       }}
      />
    </Grid>

  );
}

export default withStyles(styles)(Datepicker);
