import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CustomInput from './CustomInput'
import * as actionTypes from '../../actions/accomodation';
import { connect } from 'react-redux'

const useStyles = makeStyles(theme => ({
  label: {
    color: "white"
  }
}));


const PersonalDetailsForm = (props) => {
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
            data={props.personalDetails.firstName}
            onChangeHandler={(e) => props.onFNChange(e.target.value)}
            name="firstName"
            label="First name" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomInput
            id="lastName"
            name="lastName"
            onChangeHandler={(e) => props.onLNChange(e.target.value)}
            data={props.personalDetails.lastName}
            label="Last name" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomInput
            id="outlined-email-input"
            label="Email"
            type="email"
            onChangeHandler={(e) => props.onEChange(e.target.value)}
            data={props.personalDetails.email}
            name="email" />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomInput
            id="country"
            name="country"
            label="Country"
            onChangeHandler={(e) => props.onCChange(e.target.value)}
            data={props.personalDetails.country}
          />
        </Grid>

      </Grid>

    </React.Fragment>
  );
}


const mapStateToProps = state => {
  return {
    personalDetails: state.personalDetails,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFNChange: (val) => dispatch({ type: actionTypes.FIRST_NAME, payload: val }),
    onLNChange: (val) => dispatch({ type: actionTypes.LAST_NAME, payload: val }),
    onEChange: (val) => dispatch({ type: actionTypes.EMAIL, payload: val }),
    onCChange: (val) => dispatch({ type: actionTypes.COUNTRY, payload: val }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetailsForm);
