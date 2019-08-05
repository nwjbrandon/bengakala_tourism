import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
    label: {
        color: "white"
    }
}));


const PickupDetails = (props) => {

    const classes = useStyles();

    return (
        <Grid item xs={12}>
            <Paper className={classes.root}>
                <Typography >
                    Enter your pick up details, flight number and other important information
                </Typography>



                <Grid container spacing={3}>
                    <TextField
                        onChange={props.onChangeHandler}
                        required
                        value={props.data}
                        id="standard-textarea"
                        label="Pick Up details"
                        placeholder="1240 at Denpasar Airport Terminal 2"
                        multiline
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                    />
                </Grid>



            </Paper>
        </Grid>
    );
}

export default PickupDetails