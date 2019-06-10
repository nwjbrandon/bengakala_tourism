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
    color: "white",

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
        // value={values.age}
        onChange={() => {}}
        type="number"
        // className={classes.textField}
        InputLabelProps={{
          shrink: true,

        }}
        margin="normal"
        fullWidth
      />
    </Grid>
  );

}

export default withStyles(styles)(NumberSelector);
