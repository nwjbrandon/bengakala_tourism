import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import uuidv1 from 'uuid/v1';
import NavBar from '../../../../components/dashboard/navBar';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
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
            currentUsers: {
                '1': {
                    title: 'Asuna Yuuki',
                    type: 'Fighter',
                    text: 'asuna@gmail.com - 123456789',
                    edit: false,
                    root: true,
                    copyTitle: 'Asuna Yuuki',
                    copyType: 'Fighter',
                    copyText: 'asuna@gmail.com - 123456789',
                },
                '2': {
                    title: 'Isla',
                    type: 'Griftia',
                    text: 'isla@gmail.com - 123456789',
                    edit: false,
                    root: false,
                    copyTitle: 'Isla',
                    copyType: 'Griftia',
                    copyText: 'isla@gmail.com - 123456789',
                },
            },
            newUsers: {},
            title: 'Settings',
            open: false,
            username: 'test@example.com',
            password: '',
            confirmedPassword: '',
        }
        this.cancelEntry = this.cancelEntry.bind(this)
        this.editEntry = this.editEntry.bind(this)
        this.updateEntry = this.updateEntry.bind(this)
        this.deleteEntry = this.deleteEntry.bind(this)
        this.watchQuestionEntry = this.watchQuestionEntry.bind(this)
        this.watchTextEntry = this.watchTextEntry.bind(this)
        this.watchTypeEntry = this.watchTypeEntry.bind(this)
        this.newEntry = this.newEntry.bind(this)
        this.warningEntry = this.warningEntry.bind(this)
        this.submitEntry = this.submitEntry.bind(this)
        this.confirmWarning = this.confirmWarning.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    addNotification() {
        this.notificationDOMRef.current.addNotification({
            title: "Awesomeness",
            message: "Awesome Notifications!",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: 2000 },
            dismissable: { click: true }
        });
    }

    submitEntry() {
    }

    warningEntry() {
        this.setState({ open: true })
    }

    handleClose() {
        this.setState({
            open: false,
            newUsers: {},
        })
    }

    confirmWarning() {
        this.setState({ open: false })
        this.submitEntry()
    }

    newEntry() {
        const id = uuidv1()
        let newData = this.state.newUsers
        newData[id] = {
            title: '',
            type: '',
            text: '',
            edit: true,
            root: false,
            copyTitle: '',
            copyType: '',
            copyText: '',
        }
        this.setState({ newUsers: newData })
    }

    watchQuestionEntry(event) {
        let newData = this.state.data
        const id = event.target.id
        newData[id].copyTitle = event.target.value
        this.setState({ data: newData })
    }

    watchTypeEntry(event) {
        let newData = this.state.data
        const id = event.target.id
        newData[id].copyType = event.target.value
        this.setState({ data: newData })
    }

    watchTextEntry(event) {
        let newData = this.state.data
        const id = event.target.id
        newData[id].copyText = event.target.value
        this.setState({ data: newData })
    }

    cancelEntry(event) {
        let newData = this.state.newUsers
        const id = event.currentTarget.value
        delete newData[id]
        this.setState({ newUsers: newData})
    }

    editEntry(event, data) {
        let newData = this.state.data
        const id = event.currentTarget.value
        newData[id].edit = true
        this.setState({ data: newData })
    }

    updateEntry(event) {
        let newData = this.state.data
        const id = event.currentTarget.value
        newData[id].edit = false
        newData[id].text = newData[id].copyText
        newData[id].title = newData[id].copyTitle
        newData[id].type = newData[id].copyType
        this.setState({ data: newData })
    }

    deleteEntry(event) {
        let newData = this.state.currentUsers
        const id = event.currentTarget.value
        delete newData[id]
        this.setState({ currentUsers: newData})
    }

    render() {
        const { classes } = this.props
        const { title, currentUsers, newUsers, open, confirmedPassword, password, username } = this.state
        return (
            <div className={classes.root}>
                <CssBaseline />
                <NavBar title={title} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <div className="app-content">
                        <ReactNotification ref={this.notificationDOMRef} />
                        <button onClick={this.addNotification} className="btn btn-primary">
                            Add Awesome Notification
                        </button>
                    </div>
                    <TextField
                        multiline={true}
                        variant="outlined"
                        fullWidth
                        value={username}
                        placeholder="Ex. Where are we located?"
                        label="Question"
                        className={classes.button}
                        onChange={(event) => { this.setState({ username: event.target.value})}}
                    />
                    <TextField
                        multiline={true}
                        variant="outlined"
                        fullWidth
                        value={password}
                        placeholder="Ex. Where are we located?"
                        label="Question"
                        className={classes.button}
                        onChange={(event) => { this.setState({ password: event.target.value })}}
                    />
                    <TextField
                        multiline={true}
                        variant="outlined"
                        fullWidth
                        value={password}
                        placeholder="Ex. Where are we located?"
                        label="Question"
                        className={classes.button}
                        onChange={(event) => { this.setState({ password: event.target.value })}}
                    />
                    <TextField
                        multiline={true}
                        variant="outlined"
                        fullWidth
                        value={confirmedPassword}
                        placeholder="Ex. Where are we located?"
                        label="Question"
                        className={classes.button}
                        onChange={(event) => { this.setState({ confirmedPassword: event.target.value })}}
                    />
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                        <Button variant="contained" color="secondary"  onClick={this.cancelEntry} className={classes.button}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="secondary" className={classes.button} onClick={this.submitEntry}>
                            Submit
                        </Button>
                    </Grid>
                    <br />
                    {Object.keys(currentUsers).map((item, index) => (
                        <ExpansionPanel key={index}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading}>{ currentUsers[item].type }</Typography>
                                &nbsp;-&nbsp;
                                <Typography className={classes.heading}>{ currentUsers[item].title }</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    { currentUsers[item].text } { currentUsers[item].edit }
                                </Typography>
                            </ExpansionPanelDetails>
                            { currentUsers[item].root ?
                                <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                                </Grid>
                                :
                                <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                                    <Button variant="contained" color="secondary" value={item} onClick={this.warningEntry} className={classes.button}>
                                        Delete
                                    </Button>
                                </Grid>
                            }
                        </ExpansionPanel>
                    ))}
                    <br />
                    {Object.keys(newUsers).map((item, index) => (
                        <ExpansionPanel key={index}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading}>Job Title</Typography>
                                &nbsp;-&nbsp;
                                <Typography className={classes.heading}>Name of Administrator</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid container alignItems="flex-start" justify="flex-start" direction="row">
                                    <TextField
                                        multiline={true}
                                        variant="outlined"
                                        fullWidth
                                        value={newUsers[item].copyTitle}
                                        placeholder="Ex. Where are we located?"
                                        label="Question"
                                        className={classes.button}
                                        onChange={this.watchQuestionEntry}
                                        id={item}
                                    />
                                    <TextField
                                        multiline={true}
                                        variant="outlined"
                                        fullWidth
                                        value={newUsers[item].copyType}
                                        placeholder="Ex. General FAQ"
                                        label="Type"
                                        className={classes.button}
                                        onChange={this.watchTypeEntry}
                                        id={item}
                                    />
                                    <TextField
                                        multiline={true}
                                        variant="outlined"
                                        fullWidth
                                        value={newUsers[item].copyText}
                                        placeholder="We are located at Bengkala, Indonesia"
                                        label="Answer"
                                        className={classes.button}
                                        onChange={this.watchTextEntry}
                                        id={item}
                                    />
                                </Grid>
                            </ExpansionPanelDetails>
                            <div className={classes.toolbar} />
                            <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                                <Button variant="contained" color="secondary" value={item} onClick={this.cancelEntry} className={classes.button}>
                                    Cancel
                                </Button>
                                <Button variant="contained" color="secondary" className={classes.button} onClick={this.submitEntry}>
                                    Submit
                                </Button>
                            </Grid>
                        </ExpansionPanel>
                    ))}
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                        <Button variant="contained" onClick={this.newEntry} className={classes.button}>
                            New
                        </Button>
                    </Grid>
                </main>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
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
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.confirmWarning} color="primary" autoFocus>
                            Submit
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