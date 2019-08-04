import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import * as actionTypes from '../../actions/booking';

import TransportSelect from './TransportSelect'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { connect } from 'react-redux'


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
        marginBottom: "20"
    },
    label: {
        color: "white",
        fontFamily: "Montserrat, sans-serif",
    },
    transportLabel: {
        color: "black",
        fontFamily: "Montserrat, sans-serif",
    }
}));


const TransportDetailsForm = (props) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Typography className={classes.label} variant="h6" gutterBottom>
                Enter Your Transport Preferences
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.root}>
                        <Typography className={classes.transportLabel} variant="h6" gutterBottom>
                            Please be informed the availability is subject to demand and the payment will be done during your check-in
                        </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper className={classes.root}>
                        <Grid container spacing={0}>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={props.transportNeeded} onChange={() => {
                                        props.onBikeChange(0);
                                        props.onCarChange(0);
                                        props.onVanChange(0);
                                        props.setNeeded(!props.transportNeeded)
                                    }} value="checkedA" />
                                }
                                label="Do You need Transport from the Airport?"
                            />
                        </Grid>
                    </Paper>
                </Grid>

                {props.transportNeeded ?

                    <TransportSelect
                        numberCars={props.tripDetails.numberCars}
                        numberVans={props.tripDetails.numberVans}
                        numberBikes={props.tripDetails.numberBikes}
                        carChanged={(e) => props.onCarChange(e.target.value)}
                        vanChanged={(e) => props.onVanChange(e.target.value)}
                        bikeChanged={(e) => props.onBikeChange(e.target.value)} />
                    : null

                }

            </Grid>
        </React.Fragment>
    );
}



const mapStateToProps = state => {
    return {
        tripDetails: state.booking.tripDetails,
        excludeDates: state.booking.excludeDates
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCarChange: (val) => dispatch({ type: actionTypes.CARS, payload: parseInt(val, 10) }),
        onVanChange: (val) => dispatch({ type: actionTypes.VANS, payload: parseInt(val, 10) }),
        onBikeChange: (val) => dispatch({ type: actionTypes.BIKES, payload: parseInt(val, 10) }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransportDetailsForm);
