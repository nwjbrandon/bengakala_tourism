import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import NumberSelector from './NumberSelector'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
    label: {
        color: "white"
    }
}));


const TransportSelect = (props) => {

    const classes = useStyles();

    return (
        <Grid item xs={12}>
            <Paper className={classes.root}>
                <Typography >
                    {props.airport ? 'Select the number of cars needed for Airport pickup ' : 'Select Your Vehicles for village touring'}
                </Typography>

                {props.airport ?

                    <Grid container spacing={3}>
                        <NumberSelector changed={props.airportCarChanged} value={props.numberAirportCars} division={12} label="Cars" occupancy={4} />
                    </Grid>

                    :

                    <Grid container spacing={3}>
                        <NumberSelector changed={props.carChanged} value={props.numberCars} division={4} label="Cars" occupancy={4} />
                        <NumberSelector changed={props.vanChanged} value={props.numberVans} division={4} label="Vans" occupancy={6} />
                        <NumberSelector changed={props.bikeChanged} value={props.numberBikes} division={4} label="MotorBikes" occupancy={2} />
                    </Grid>

                }


            </Paper>
        </Grid>
    );
}

export default TransportSelect