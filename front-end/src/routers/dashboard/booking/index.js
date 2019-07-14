import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Chart from "react-google-charts";
import NavBar from '../../../components/dashboard/navBar';
import DashboardBookingCostEntries from '../../../components/dashboardBooking/dashboardBookingCostEntries.container';
import DashboardBookingAccommodationEntries from '../../../components/dashboardBooking/dashboardBookingAccommodationEntries.container';

import SuccessToast from "../../../components/snackBar/successSnackBar.container";
import ErrorToast from "../../../components/snackBar/errorSnackBar.container";
import { Typography } from '@material-ui/core';
import TextField from "@material-ui/core/TextField";
import uuidv1 from "uuid/v1";

const styles = theme => ({
    root: {
        display: 'flex',
        overflowX: 'auto',
        width: '100%'
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
            title: '',
            imgUrl: '',
        };
        this.reset = this.reset.bind(this);
        this.submit = this.submit.bind(this);
        this.watchDate = this.watchDate.bind(this);
        this.deleteEntry = this.deleteEntry.bind(this);
        this.newEntry = this.newEntry.bind(this);
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

    deleteEntry(event) {
        const { deleteEntry } = this.props;
        const id = event.currentTarget.value;
        deleteEntry({
            id,
            type: 'booking'
        });
    }

    newEntry () {
        const { saveEntry } = this.props;
        const id = uuidv1();
        const {
            imgUrl,
            title,
        } = this.state;
        const payload = {
            imgUrl,
            title,
            type: 'booking',
            edit: 1
        };
        saveEntry({ id, payload, type: 'booking' });
        this.setState({
            imgUrl: '',
            title: '',
        });
    }

    render() {
        const { classes, excludedDates } = this.props;
        const { title, imgUrl } = this.state;
        const navTitle = 'Booking';
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
                <NavBar title={navTitle} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Typography variant="h4" align="center" style={{ paddingTop: 40 }}>
                        Create new Pictures
                    </Typography>
                    <TextField
                        multiline={true}
                        variant="outlined"
                        fullWidth
                        value={title}
                        placeholder="Eg. Funny Random Meme Dump"
                        label="Name of Event"
                        className={classes.button}
                        onChange={(event) => this.setState({ title: event.currentTarget.value })}
                    />
                    <TextField
                        multiline={true}
                        variant="outlined"
                        fullWidth
                        value={imgUrl}
                        placeholder="Eg. https://imgur.com/a/o0v57.jp.jpg"
                        label="Imgur URL Links"
                        className={classes.button}
                        onChange={(event) => this.setState({ imgUrl: event.currentTarget.value })}
                    />
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                        <Button variant="contained" onClick={this.newEntry} className={classes.button}>
                            Save
                        </Button>
                    </Grid>
                    <Typography variant='h4'>
                        Edit Pictures
                    </Typography>
                    <DashboardBookingAccommodationEntries
                        entryAction={this.deleteEntry}
                    />
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                        <Button variant="contained" onClick={this.reset} className={classes.button}>
                            Reset
                        </Button>
                        <Button variant="contained" color="secondary" onClick={this.submit} className={classes.button}>
                            Confirm changes
                        </Button>
                    </Grid>

                    <Typography variant='h4'>
                        Edit Costs for Items
                    </Typography>
                    <DashboardBookingCostEntries />
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                        <Button variant="contained" onClick={this.reset} className={classes.button}>
                            Reset
                        </Button>
                        <Button variant="contained" color="secondary" onClick={this.submit} className={classes.button}>
                            Confirm changes
                        </Button>
                    </Grid>

                    <Typography variant='h4'>
                        Excluding Dates
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
                            Confirm changes
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
