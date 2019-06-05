import React from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const NumberSelector = (props) => {

  return (
    <Grid item xs={12} sm={props.division}>
      <TextField
        id="standard-number"
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

export default NumberSelector
