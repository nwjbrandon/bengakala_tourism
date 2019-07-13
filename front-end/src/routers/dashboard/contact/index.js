import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import uuidv1 from 'uuid/v1';

import DashBoardContactDetails from '../../../components/dashboardContact/dashboardContactDetails.container';
import DashBoardContactCustomers from '../../../components/dashboardContact/dashboardContactCustomers.container';

import NavBar from '../../../components/dashboard/navBar';
import SuccessToast from "../../../components/snackBar/successSnackBar.container";
import ErrorToast from "../../../components/snackBar/errorSnackBar.container";


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
    },
});

class DashboardContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };
        this.deleteEntry = this.deleteEntry.bind(this);
        this.resetEntries = this.resetEntries.bind(this);
        this.newEntry = this.newEntry.bind(this);
        this.watchHeading = this.watchHeading.bind(this);
        this.watchTitle = this.watchTitle.bind(this);
        this.watchText = this.watchText.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        const { onMount } = this.props;
        onMount();
    }

    deleteEntry(event) {
        const { deleteEntry } = this.props;
        const id = event.currentTarget.value;
        deleteEntry(id);
    }

    resetEntries () {
        const { resetEntries } = this.props;
        resetEntries();
    }

    newEntry () {
        const { saveEntry } = this.props;
        const id = uuidv1();
        const {
            heading,
            title,
            text,
        } = this.state;
        const payload = {
            heading,
            title,
            text,
            type: 'faq',
            edit: 0 // implement editable table did not succeed
        };
        saveEntry({ id, payload });
        this.setState({
            heading: '',
            title: '',
            text: '',
        });
    }

    watchHeading(event) {
        this.setState({
            heading: event.target.value
        });
    }

    watchTitle(event) {
        this.setState({
            title: event.target.value
        });
    }

    watchText(event) {
        this.setState({
            text: event.target.value
        });
    }

    submit() {
        const { submit } = this.props;
        submit();
    }

    render() {
        const { classes } = this.props;
        const navTitle = 'Contact';
        return (
            <div className={classes.root}>
                <CssBaseline />
                <NavBar title={navTitle} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Typography variant="h4" align="center" style={{ paddingTop: 40 }}>
                        Our Contact Details
                    </Typography>
                    <DashBoardContactDetails />
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                        <Button variant="contained" onClick={this.resetEntries} className={classes.button}>
                            Reset
                        </Button>
                        <Button variant="contained" color="secondary" onClick={this.submit} className={classes.button}>
                            Confirm
                        </Button>
                    </Grid>
                    <Typography variant="h4" align="center" style={{ paddingTop: 40 }}>
                        Customer Feedbacks
                    </Typography>
                    <DashBoardContactCustomers />
                </main>
                <SuccessToast />
                <ErrorToast />
            </div>
        );
    }
}

DashboardContact.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardContact);
