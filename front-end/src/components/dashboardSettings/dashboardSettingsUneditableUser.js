import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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

class DashboardSettingsUneditableUser extends Component {
    constructor(props) {
        super(props);
        this.watchTitle = this.watchTitle.bind(this);
        this.watchText = this.watchText.bind(this);
        this.editEntry = this.editEntry.bind(this);
    }

    watchTitle(event) {
        const value = event.target.value;
        const uuid = event.target.id;
        const { watch } = this.props;
        watch({
            value,
            uuid,
            field: 'title',
            type: 'stories',
        })
    }

    watchText(event) {
        const value = event.target.value;
        const uuid = event.target.id;
        const { watch } = this.props;
        watch({
            value,
            uuid,
            field: 'text',
            type: 'stories',
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
            type: 'stories',
        })
    }

    render() {
        const { classes, displayedData: data, } = this.props;
        return (
            <div>
                {Object.keys(data).map((item) => (
                    <ExpansionPanel key={item}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>{ data[item].username }</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div>
                                <Typography>
                                    Email: { data[item].email }
                                </Typography>
                                <Typography>
                                    Contact: { data[item].phone }
                                </Typography>
                                <Typography>
                                    Contact: { data[item].jobTitle }
                                </Typography>
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))}
            </div>
        );
    }
}

DashboardSettingsUneditableUser.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardSettingsUneditableUser);