import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import API from '../../../api'

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
        this.state = {
            excludeDates: [

            ],
            numberCustomers: [
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
            ],
        };
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
        const { submit } = this.props;
        submit();
    }

    componentWillMount() {
        this.chartEvents = [
            {
                eventName: "select",
                callback: ({ chartWrapper }) => {
                    console.log("Selected ", chartWrapper.getChart().getSelection()[0].date);
                    this.addRemoveDate(chartWrapper.getChart().getSelection()[0].date);
                }
            }
        ];
    }

    updateDates = () => {

        API.post('/admin/dashboard/booking', {
            data: {
                cost: [
                    { Breakfast: 50000 },
                    { Lunch: 50000 },
                    { Dinner: 50000 },
                    { Accommodation: 50000 },
                    { Car: 50000 },
                    { Van: 50000 },
                    { Bike: 50000 },

                ],
                excludeDates: [...this.state.excludeDates]
            }

        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err)
        });

    }


    addRemoveDate = (date) => {

        if (this.state.excludeDates.find(item => { return new Date(item).getTime() === new Date(date).getTime() })) {
            const tempExcludeDates = this.state.excludeDates.filter(item => new Date(item).getTime() !== new Date(date).getTime());
            const tempNumberCustomers = this.state.numberCustomers.filter(item => new Date(item[0]).getTime() !== new Date(date).getTime());
            this.setState({ excludeDates: [...tempExcludeDates], numberCustomers: [...tempNumberCustomers] })
        } else {
            const tempExcludeDates = [...this.state.excludeDates]
            const tempNumberCustomers = [...this.state.numberCustomers]
            tempNumberCustomers.push([new Date(date), -1])
            tempExcludeDates.push(date)
            this.setState({ excludeDates: [...tempExcludeDates], numberCustomers: [...tempNumberCustomers] })
        }
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
                    <Chart chartType="Calendar" align="center" width="100%" data={this.state.numberCustomers} chartEvents={this.chartEvents} />
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                        <Button variant="contained" color="secondary" onClick={this.updateDates} className={classes.button}>
                            Update
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