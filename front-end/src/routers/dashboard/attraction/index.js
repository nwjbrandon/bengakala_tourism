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
import uuidv1 from 'uuid/v1';
import _ from 'lodash'

import NavBar from '../../../components/dashboard/navBar';

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
            data: {
                '1': {
                    title: 'Water Theme Playground for Children',
                    type: 'Fun',
                    text: 'Coming Soon!',
                    edit: false,
                    copyTitle: 'Water Theme Playground for Children',
                    copyType: 'Fun',
                    copyText: 'Coming Soon!',
                },
            },
            origin: {
                '1': {
                    title: 'Water Theme Playground for Children',
                    type: 'Fun',
                    text: 'Coming Soon!',
                    edit: false,
                    copyTitle: 'Water Theme Playground for Children',
                    copyType: 'Fun',
                    copyText: 'Coming Soon!',
                },
            },
            title: 'Attraction',
        }
        this.cancelEntry = this.cancelEntry.bind(this)
        this.editEntry = this.editEntry.bind(this)
        this.updateEntry = this.updateEntry.bind(this)
        this.deleteEntry = this.deleteEntry.bind(this)
        this.watchQuestionEntry = this.watchQuestionEntry.bind(this)
        this.watchTextEntry = this.watchTextEntry.bind(this)
        this.watchTypeEntry = this.watchTypeEntry.bind(this)
        this.newEntry = this.newEntry.bind(this)
        this.reset = this.reset.bind(this)
    }

    reset() {
        const newData = _.cloneDeep(this.state.origin)
        this.setState({ data: newData })
    }

    newEntry() {
        const id = uuidv1()
        let newData = this.state.data
        newData[id] = {
            title: '',
            type: '',
            text: '',
            edit: true,
            copyTitle: '',
            copyType: '',
            copyText: '',
        }
        this.setState({ data: newData })
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
        let newData = this.state.data
        const id = event.currentTarget.value
        newData[id].edit = false
        newData[id].copyText = newData[id].text
        newData[id].copyType = newData[id].type
        newData[id].copyTitle = newData[id].title
        this.setState({ data: newData })
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
        let newData = this.state.data
        const id = event.currentTarget.value
        delete newData[id]
        this.setState({ data: newData })
    }

    render() {
        const { classes } = this.props
        const { title, data } = this.state
        return (
            <div className={classes.root}>
                <CssBaseline />
                <NavBar title={title} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                        <Button variant="contained" onClick={this.newEntry} className={classes.button}>
                            New
                        </Button>
                    </Grid>
                    {Object.keys(data).map((item, index) => (
                        <ExpansionPanel key={index}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading}>{ data[item].type }</Typography>
                                &nbsp;-&nbsp;
                                <Typography className={classes.heading}>{ data[item].title }</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                {data[item].edit ?
                                    <Grid container alignItems="flex-start" justify="flex-start" direction="row">
                                        <TextField
                                            multiline={true}
                                            variant="outlined"
                                            fullWidth
                                            value={data[item].copyTitle}
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
                                            value={data[item].copyType}
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
                                            value={data[item].copyText}
                                            placeholder="We are located at Bengkala, Indonesia"
                                            label="Answer"
                                            className={classes.button}
                                            onChange={this.watchTextEntry}
                                            id={item}
                                        />
                                    </Grid>
                                    :
                                    <Typography>
                                        { data[item].text } { data[item].edit }
                                    </Typography>
                                }
                            </ExpansionPanelDetails>
                            { data[item].edit ?
                                <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                                    <Button variant="contained" color="secondary" value={item} onClick={this.cancelEntry} className={classes.button}>
                                        Cancel
                                    </Button>
                                    <Button variant="contained" onClick={this.updateEntry} value={item} className={classes.button}>
                                        Update
                                    </Button>
                                </Grid>
                                :
                                <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                                    <Button variant="contained" value={item} onClick={this.editEntry} className={classes.button}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" color="secondary" value={item} onClick={this.deleteEntry} className={classes.button}>
                                        Delete
                                    </Button>
                                </Grid>
                            }
                        </ExpansionPanel>
                    ))}
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                        <Button variant="contained" onClick={this.reset} className={classes.button}>
                            Reset
                        </Button>
                        <Button variant="contained" color="secondary" className={classes.button}>
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