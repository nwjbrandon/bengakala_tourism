import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const styles = {
  root: {
    background: "white",
    borderColor: "white",
    borderRadius: "10px"
  },
  input: {
    color: "black",

  }
};

function CustomizedInputs(props) {
  const { classes } = props;

  return (
    <TextField
      className={classes.root}
      InputProps={{
        className: classes.input
      }}
      onChange={props.onChangeHandler}
      required
      value= {props.data}
      id={props.id}
      name={props.id}
      label= {props.label}
      fullWidth
      autoComplete="fname"
      margin="normal"
      variant="outlined"
    />
  );
}

CustomizedInputs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomizedInputs);
