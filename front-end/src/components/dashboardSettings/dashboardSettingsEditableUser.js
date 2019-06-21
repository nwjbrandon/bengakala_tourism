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

class DashboardSettingsEditableUser extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, displayedData: data, entryAction, } = this.props;
        return (
            <div>
                {Object.keys(data).map((item) => (
                    <ExpansionPanel key={item}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>{ data[item].username } - { data[item].jobTitle }</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                { data[item].email }
                            </Typography>
                            <Typography>
                                { data[item].phone }
                            </Typography>
                        </ExpansionPanelDetails>
                        <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                            <Button variant="contained" color="secondary" value={item} onClick={entryAction} className={classes.button}>
                                Delete
                            </Button>
                        </Grid>
                    </ExpansionPanel>
                ))}
            </div>
        );
    }
}

DashboardSettingsEditableUser.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardSettingsEditableUser);