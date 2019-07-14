import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import uuidv1 from 'uuid/v1';

import NavBar from '../../../components/dashboard/navBar';
import DashBoardResourcesEntries from "../../../components/dashboardExplore/dashboardExploreEntries.container";
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
            data: {},
            imgUrl: '',
            title: '',
            text: '',
        };
        this.deleteEntry = this.deleteEntry.bind(this);
        this.resetEntries = this.resetEntries.bind(this);
        this.newEntry = this.newEntry.bind(this);
        this.watchImgUrl = this.watchImgUrl.bind(this);
        this.watchTitle = this.watchTitle.bind(this);
        this.watchText = this.watchText.bind(this);
        this.watchHeading = this.watchHeading.bind(this);
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
            imgUrl,
            title,
            text,
            heading,
        } = this.state;
        const payload = {
            imgUrl,
            title,
            text,
            heading,
            type: 'video',
            edit: 1
        };
        saveEntry({ id, payload });
        this.setState({
            imgUrl: '',
            title: '',
            text: '',
            heading: '',
        });
    }

    watchImgUrl(event) {
        this.setState({
            imgUrl: event.target.value
        });
    }

    watchTitle(event) {
        this.setState({
            title: event.target.value
        });
    }

    watchHeading(event) {
        this.setState({
            heading: event.target.value
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
        const { imgUrl, title, text } = this.state;
        const navTitle = 'Explore resources';
        return (
            <div className={classes.root}>
                <CssBaseline />
                <NavBar title={navTitle} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Typography variant="h4" align="center" style={{ paddingTop: 40 }}>
                        Create new { navTitle }
                    </Typography>
                    <TextField
                        multiline={true}
                        variant="outlined"
                        fullWidth
                        value={title}
                        placeholder="Eg. Learn Bahasa Indonesia today!"
                        label="Name of Explore video"
                        className={classes.button}
                        onChange={this.watchTitle}
                    />
                    <TextField
                        multiline={true}
                        variant="outlined"
                        fullWidth
                        value={imgUrl}
                        placeholder="Eg. 9SKA6PmcLuQ"
                        label="Video URL Links ID"
                        className={classes.button}
                        onChange={this.watchImgUrl}
                    />

                    <TextField
                        multiline={true}
                        variant="outlined"
                        fullWidth
                        value={text}
                          placeholder="Eg. Come visit us and learn together in a fun and engaging way!"
                        label="Description of Explore video"
                        className={classes.button}
                        onChange={this.watchText}
                    />
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                        <Button variant="contained" onClick={this.newEntry} className={classes.button}>
                            Save
                        </Button>
                    </Grid>
                    <Typography variant="h4" align="center" style={{ paddingTop: 40 }}>
                        Existing list of { navTitle }
                    </Typography>
                    <DashBoardResourcesEntries
                        entryAction={this.deleteEntry}
                    />
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                        <Button variant="contained" onClick={this.resetEntries} className={classes.button}>
                            Reset
                        </Button>
                        <Button variant="contained" color="secondary" onClick={this.submit} className={classes.button}>
                            Confirm changes
                        </Button>
                    </Grid>
                </main>
                <SuccessToast />
                <ErrorToast />
            </div>
        );
    }
}

DashboardFAQ.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardFAQ);
