import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Chart from "react-google-charts";
import NavBar from '../../../components/dashboard/navBar';
import DashboardBookingEntries from '../../../components/dashboardBooking/dashboardBookingEntries.container'
import SuccessToast from "../../../components/snackBar/successSnackBar.container";
import ErrorToast from "../../../components/snackBar/errorSnackBar.container";
import { Typography } from '@material-ui/core';

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

class DashboardBooking extends Component {
    constructor(props) {
        super(props);
        this.reset = this.reset.bind(this);
        this.submit = this.submit.bind(this);
        this.watchDate = this.watchDate.bind(this);
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
        const { submit } = this.props;
        submit();
    }

    watchDate = (date) => {
        const { watch } = this.props;
        watch(date);
    };

    render() {
        const { classes, excludedDates } = this.props;
        const title = 'Booking';
        const data = [
            [
                {
                    type: "date",
                    id: "Date"
                },
                {
                    type: "number",
                    id: "Number of Customers"
                }
            ],
            ...excludedDates,
        ];
        return (
            <div className={classes.root}>
                <CssBaseline />
                <NavBar title={title} />
                <main className={classes.content}>

                    <div className={classes.toolbar} />
                    <Typography variant='h4'>
                        Select Individual Cost
                </Typography>
                    <DashboardBookingEntries />
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                        <Button variant="contained" onClick={this.reset} className={classes.button}>
                            Reset
                        </Button>
                        <Button variant="contained" color="secondary" onClick={this.submit} className={classes.button}>
                            Submit
                        </Button>
                    </Grid>

                    <Typography variant='h4'>
                        Exclude Dates
                  </Typography>
                    <Chart
                        chartType="Calendar"
                        align="center"
                        width="100%"
                        data={data}
                        chartEvents={[
                            {
                                eventName: "select",
                                callback: ({ chartWrapper }) => {
                                    this.watchDate(chartWrapper.getChart().getSelection()[0].date);
                                }
                            }
                        ]}
                    />
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                        <Button variant="contained" color="secondary" onClick={this.submit} className={classes.button}>
                            Submit
                    </Button>
                    </Grid>
                </main>
                <SuccessToast />
                <ErrorToast />
            </div>
        );
    }
}

DashboardBooking.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardBooking);