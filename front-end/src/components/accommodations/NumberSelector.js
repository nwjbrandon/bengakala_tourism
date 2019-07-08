import React from 'react'
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

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


const NumberSelector = (props) => {
  const { classes } = props;

  return (
    <Grid item xs={12} sm={props.division}>
      <TextField
        id="standard-number"
        className={classes.root}
        InputProps={{
          className: classes.input
        }}
        label={props.label}
        value={props.value}
        onChange={props.changed}
        type="number"
        // className={classes.textField}
        InputLabelProps={{
          shrink: true,

        }}
        margin="normal"
        fullWidth
      />
      {props.occupancy ?
        <p style={{ fontSize: "10px", color: "grey", fontStyle: "italics", margin: "0px", padding: "0px" }}>Max Occupancy :{props.occupancy}</p>
        : null
      }
    </Grid>
  );

}

export default withStyles(styles)(NumberSelector);
