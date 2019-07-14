import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import uuidv1 from 'uuid/v1';
import "react-notifications-component/dist/theme.css";

import DashBoardEditableUser from '../../../components/dashboardSettings/dashboardSettingsEditableUser.container';
import DashBoardUneditableUser from '../../../components/dashboardSettings/dashboardSettingsUneditableUser.container';
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
    }
});

class DashboardFAQ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDelete: false,
            username: '',
            password: '',
            confirmedPassword: '',
            delete: '',
            openNew: false,
            newUsername: '',
            newPassword: '',
            newConfirmedPassword: '',
            newJobTitle: '',
            newPhone: '',
            newEmail: '',

        };
        this.deleteEntry = this.deleteEntry.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
        this.closeDelete = this.closeDelete.bind(this);
        this.newUser = this.newUser.bind(this);
        this.closeCreate = this.closeCreate.bind(this);
        this.confirmCreate = this.confirmCreate.bind(this);
        this.submit = this.submit.bind(this);

    }

    componentDidMount() {
        const { onMount } = this.props;
        onMount();
    }

    submit() {
        const { username, password, confirmedPassword } = this.state;
        const { change } = this.props;
        change({
            email: username,
            existingPassword: password,
            newPassword: confirmedPassword,
        })
    }

    confirmCreate() {
        const {
            newUsername,
            newPassword,
            newJobTitle,
            newConfirmedPassword,
            newPhone,
        } = this.state;
        const id = uuidv1();
        this.setState({
            openNew: false,
        });
        const { create, } = this.props;
        create({
            uuid: id,
            username: newUsername,
            password: newPassword,
            confirmedPassword: newConfirmedPassword,
            jobTitle: newJobTitle,
            phone: newPhone,
            email: newUsername,
        });
    }

    closeCreate() {
        this.setState({
            openNew: false,
            newUsername: '',
            newPassword: '',
            newConfirmedPassword: '',
            newJobTitle: '',
            newPhone: '',
            newEmail: '',
        })
    }

    newUser() {
        this.setState({
            openNew: true,
        })
    }

    closeDelete() {
        this.setState({
            openDelete: false,
            delete: '',
        });
    }

    confirmDelete() {
        const id = this.state.delete;
        this.setState({
            delete: '',
            openDelete: false,
        });
        const { del } = this.props;
        del(id);
    }

    deleteEntry(event) {
        const id = event.currentTarget.value;
        this.setState({
            delete: id,
            openDelete: true,
        });
    }

    render() {
        const { classes } = this.props;
        const {
            openDelete, confirmedPassword, password, username,
            openNew, newUsername, newPassword, newConfirmedPassword, newJobTitle, newPhone,
        } = this.state;
        const title = 'Settings';
        return (
            <div className={classes.root}>
                <CssBaseline />
                <NavBar title={title} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Typography variant="h4" align="center" style={{ paddingTop: 40 }}>
                        Change User's Password
                    </Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={username}
                        placeholder="Eg. 123@example.com"
                        label="Email"
                        className={classes.button}
                        onChange={(event) => { this.setState({ username: event.target.value})}}
                    />
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={password}
                        placeholder="Eg. password"
                        label="Current Password"
                        type="password"
                        className={classes.button}
                        onChange={(event) => { this.setState({ password: event.target.value })}}
                    />
                    <TextField
                        variant="outlined"
                        fullWidth
                        type="password"
                        value={confirmedPassword}
                        placeholder="Eg. password"
                        label="New Password"
                        className={classes.button}
                        onChange={(event) => { this.setState({ confirmedPassword: event.target.value })}}
                    />
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                        <Button variant="contained" color="secondary" className={classes.button} onClick={this.submit}>
                            Confirm
                        </Button>
                    </Grid>
                    <br />
                    <DashBoardUneditableUser />
                    <br />
                    <DashBoardEditableUser
                        entryAction={this.deleteEntry}
                    />
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                        <Button variant="contained" onClick={this.newUser} className={classes.button}>
                            New
                        </Button>
                    </Grid>
                </main>
                <SuccessToast />
                <ErrorToast />
                <Dialog
                    open={openDelete}
                    onClose={this.closeDelete}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Delete Admin User"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this admin user?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeDelete} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.confirmDelete} color="primary" autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={openNew}
                    onClose={this.closeDelete}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"New User"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Fill up the form below
                        </DialogContentText>
                        <TextField
                            variant="outlined"
                            fullWidth
                            value={newUsername}
                            placeholder="Eg. 123@example.com"
                            label="Email"
                            className={classes.button}
                            onChange={(event) => { this.setState({ newUsername: event.target.value })}}
                        />
                        <TextField
                            variant="outlined"
                            fullWidth
                            value={newPassword}
                            placeholder="Eg. password"
                            label="Password"
                            type="password"
                            className={classes.button}
                            onChange={(event) => { this.setState({ newPassword: event.target.value })}}
                        />
                        <TextField
                            variant="outlined"
                            fullWidth
                            value={newConfirmedPassword}
                            placeholder="Eg. password"
                            label="Confirm Password"
                            type="password"
                            className={classes.button}
                            onChange={(event) => { this.setState({ newConfirmedPassword: event.target.value })}}
                        />
                        <TextField
                            variant="outlined"
                            fullWidth
                            value={newJobTitle}
                            placeholder="Eg. Officer"
                            label="Job Title"
                            className={classes.button}
                            onChange={(event) => { this.setState({ newJobTitle: event.target.value })}}
                        />
                        <TextField
                            variant="outlined"
                            fullWidth
                            value={newPhone}
                            placeholder="Eg. +62 1234 5678"
                            label="Phone"
                            className={classes.button}
                            onChange={(event) => { this.setState({ newPhone: event.target.value })}}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeCreate} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.confirmCreate} color="primary" autoFocus>
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

DashboardFAQ.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardFAQ);
