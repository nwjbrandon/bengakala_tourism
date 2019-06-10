import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CustomInput from './CustomInput'


const useStyles = makeStyles(theme => ({
  label:{
    color: "white"
  }
}));


const AddressForm = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography className={classes.label} variant="h6" gutterBottom>
        Enter Your Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <CustomInput
            id="firstName"
            data={props.firstName}
            onChangeHandler = {(e) => props.onFNChangeHandler(e.target.value)}
            name="firstName"
            label="First name"/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomInput
            id="lastName"
            name="lastName"
            onChangeHandler = {(e) => props.onLNChangeHandler(e.target.value)}
            data={props.lastName}
            label="Last name"/>
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomInput
            id="outlined-email-input"
            label="Email"
            type="email"
            onChangeHandler = {(e) => props.onEChangeHandler(e.target.value)}
            data={props.email}
            name="email"/>
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomInput
            id="country"
            name="country"
            label="Country"
            onChangeHandler = {(e) => props.onCChangeHandler(e.target.value)}
            data={props.country}
          />
        </Grid>

      </Grid>
    </React.Fragment>
  );
}


export default AddressForm;
