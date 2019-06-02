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

const tmp = [
    {
        title: 'Expansion Table 1',
        type: 'General FAQ',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacusex, sit amet blandit leo lobortis eget.',
        edit: false,
        id: '1',
        copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacusex, sit amet blandit leo lobortis eget.',
    },
    {
        title: 'Expansion Table 2',
        type: 'Security FAQ',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacusex, sit amet blandit leo lobortis eget.',
        edit: true,
        id: '2',
        copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacusex, sit amet blandit leo lobortis eget.',
    },
]


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
                    title: 'Expansion Table 1',
                    type: 'General FAQ',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacusex, sit amet blandit leo lobortis eget.',
                    edit: false,
                    id: '1',
                    copyTitle: 'Copy Expansion Table 1',
                    copyType: 'Copy General FAQ',
                    copyText: 'Copy Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacusex, sit amet blandit leo lobortis eget.',
                },
                '2': {
                    title: 'Expansion Table 2',
                    type: 'Security FAQ',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacusex, sit amet blandit leo lobortis eget.',
                    edit: false,
                    id: '2',
                    copyTitle: 'Copy Expansion Table 1',
                    copyType: 'Copy General FAQ',
                    copyText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacusex, sit amet blandit leo lobortis eget.',
                },
            },
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

    edit(val) {
        const itemID = val.currentTarget.value
        const newData = this.state.data
        newData[itemID].edit = false
        this.setState({ data: newData })
    }

    submit() {
    }

    delete() {
    }

    render() {
        const { classes } = this.props
        const { title, edit, text, question, data } = this.state
        return (
            <div className={classes.root}>
                <CssBaseline />
                <NavBar title={title} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
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
                                        />
                                        <TextField
                                            multiline={true}
                                            variant="outlined"
                                            fullWidth
                                            value={data[item].copyType}
                                            placeholder="Ex. General FAQ"
                                            label="Type"
                                            className={classes.button}
                                        />
                                        <TextField
                                            multiline={true}
                                            variant="outlined"
                                            fullWidth
                                            value={data[item].copyText}
                                            placeholder="We are located at Bengkala, Indonesia"
                                            label="Answer"
                                            className={classes.button}
                                        />
                                    </Grid>
                                    :
                                    <Typography>
                                        { data[item].type } - { data[item].title }
                                    </Typography>
                                }
                            </ExpansionPanelDetails>
                            { data[item].edit ?
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
                                    <Button variant="contained" value={data[item].id} onClick={this.edit} className={classes.button}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={this.delete} className={classes.button}>
                                        Delete
                                    </Button>
                                </Grid>
                            }
                        </ExpansionPanel>

                    ))}
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