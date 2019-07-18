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
import format from 'date-fns/format';

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
        this.deleteEntry = this.deleteEntry.bind(this);
    }

    deleteEntry(event) {
        const { del } = this.props;
        del(event.currentTarget.value);
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
                            <Typography className={classes.heading}>Subject: { data[item].paragraph } - { format(data[item].date, 'MM/DD/YYYY')} </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid>
                                <Typography>
                                    Email: { data[item].title }
                                </Typography>
                                <Typography>
                                    Name: { data[item].heading }
                                </Typography>
                                <Typography>
                                    Contact: { data[item].subheading }
                                </Typography>
                                <Typography>
                                    Message: { data[item].subparagraph }
                                </Typography>
                            </Grid>
                        </ExpansionPanelDetails>
                        <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                            <Button variant="contained" color="secondary" value={item} id={item} onClick={this.deleteEntry} className={classes.button}>
                                Delete
                            </Button>
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