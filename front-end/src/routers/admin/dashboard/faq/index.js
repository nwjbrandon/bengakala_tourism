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

import NavBar from '../../../../components/dashboard/navBar';

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
            title: 'FAQ',
            edit: false,
            question: 'Expansion Panel 1',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacusex, sit amet blandit leo lobortis eget.'
        }
        this.cancel = this.cancel.bind(this)
        this.edit = this.edit.bind(this)
        this.submit = this.submit.bind(this)
        this.delete = this.delete.bind(this)
    }

    cancel() {
        this.setState({edit: !this.state.edit })
    }

    edit() {
        this.setState({edit: !this.state.edit })
    }

    submit() {
    }

    delete() {
    }

    render() {
        const { classes } = this.props
        const { title, edit, text, question } = this.state
        return (
            <div className={classes.root}>
                <CssBaseline />
                <NavBar title={title} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>General FAQ</Typography>
                            <Typography className={classes.heading}>Expansion Table 1</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {edit ?
                                <Grid container alignItems="flex-start" justify="flex-start" direction="row">
                                    <TextField
                                        multiline={true}
                                        variant="outlined"
                                        fullWidth
                                        value={question}
                                        placeholder="Ex. Where are we located?"
                                        label="Question"
                                        onChange={e => this.setState({question: e.target.value})}
                                        className={classes.button}
                                    />
                                    <TextField
                                        multiline={true}
                                        variant="outlined"
                                        fullWidth
                                        value={question}
                                        placeholder="Ex. General FAQ"
                                        label="Type"
                                        onChange={e => this.setState({question: e.target.value})}
                                        className={classes.button}
                                    />
                                    <TextField
                                        multiline={true}
                                        variant="outlined"
                                        fullWidth
                                        value={text}
                                        placeholder="We are located at Bengkala, Indonesia"
                                        label="Answer"
                                        onChange={e => this.setState({text: e.target.value})}
                                        className={classes.button}
                                    />
                                </Grid>
                                :
                                <Typography>
                                    { text }
                                </Typography>
                            }
                        </ExpansionPanelDetails>
                        { edit ?
                            <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                                <Button variant="contained" color="secondary" onClick={this.cancel} className={classes.button}>
                                    Cancel
                                </Button>
                                <Button variant="contained" onClick={this.submit} className={classes.button}>
                                    Submit
                                </Button>
                            </Grid>
                            :
                            <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                                <Button variant="contained" onClick={this.edit} className={classes.button}>
                                    Edit
                                </Button>
                                <Button variant="contained" color="secondary" onClick={this.delete} className={classes.button}>
                                    Delete
                                </Button>
                            </Grid>
                        }
                    </ExpansionPanel>
                </main>
            </div>
        );
    }
}

DashboardFAQ.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardFAQ);