import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from "@material-ui/core/TextField";

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

class DashboardContactDetails extends Component {
    constructor(props) {
        super(props);
        this.watchText = this.watchText.bind(this);
        this.editEntry = this.editEntry.bind(this);
    }

    watchText(event) {
        const value = event.target.value;
        const uuid = event.target.id;
        const { watch } = this.props;
        watch({
            value,
            uuid,
            field: 'text',
            type: 'contact'
        })
    }

    editEntry(event) {
        const value = event.currentTarget.value;
        const uuid = event.currentTarget.id;
        const { watch } = this.props;
        watch({
            value: value === 'true' ? 1 : 0,
            uuid,
            field: 'edit',
            type: 'contact'
        })
    }

    render() {
        const { classes, displayedData: data } = this.props;
        return (
            <div>
                {Object.keys(data).map((item) => (
                    <ExpansionPanel key={item}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                        <Typography className={classes.heading}>{ data[item].title ? data[item].title.split("\n").map((i,key) => (
                            <Typography variant="body1" style={{ marginTop: '10px', marginBottom: '10px' }} key={key}>{i}</Typography>)) : <div /> }
                        </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {data[item].edit ?
                                <Grid container alignItems="flex-start" justify="flex-start" direction="row">
                                    <TextField
                                        multiline={true}
                                        variant="outlined"
                                        fullWidth
                                        value={data[item].text}
                                        placeholder="Eg. You can contact us at: Bengkala / +62 1234 5678 / 10:00am"
                                        label="Contact Details"
                                        className={classes.button}
                                        onChange={this.watchText}
                                        id={item}
                                    />
                                </Grid>
                                :
                                <Typography>
                                    { data[item].text ? data[item].text.split("\n").map((i,key) => (
                                      <div key={key}>{i}</div>)) : <div />
                                    }
                                </Typography>
                            }
                        </ExpansionPanelDetails>
                        <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                            {data[item].edit ?
                                <Button variant="contained" color="secondary" value={false} id={item} onClick={this.editEntry} className={classes.button}>
                                    Update
                                </Button>
                                :
                                <Button variant="contained" color="secondary" value={true} id={item} onClick={this.editEntry} className={classes.button}>
                                    Edit
                                </Button>
                            }
                        </Grid>
                    </ExpansionPanel>
                ))}
            </div>
        );
    }
}

DashboardContactDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardContactDetails);
