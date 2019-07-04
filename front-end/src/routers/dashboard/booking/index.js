import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import NavBar from '../../../components/dashboard/navBar';
import DashboardAccommodationEntries from '../../../components/dashboardBooking/dashboardBookingEntries.container'

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    button: {
        margin: theme.spacing(1),
    },
    buttonsLocation: {
        alignSelf: 'flex-end'
    }
});

class DashboardFAQ extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.reset = this.reset.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        const { onMount } = this.props;
        onMount();
    }

    reset() {
        const { resetEntries } = this.props;
        resetEntries();
    }

    submit() {
        const { submit }  = this.props;
        submit();
    }

    render() {
        const { classes } = this.props;
        const title = 'Booking';

        return (
            <div className={classes.root}>
                <CssBaseline />
                <NavBar title={title} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <DashboardAccommodationEntries />
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                        <Button variant="contained" onClick={this.reset} className={classes.button}>
                            Reset
                        </Button>
                        <Button variant="contained" color="secondary" onClick={this.submit} className={classes.button}>
                            Submit
                        </Button>
                    </Grid>
                </main>
            </div>
        );
    }
}

DashboardFAQ.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardFAQ);