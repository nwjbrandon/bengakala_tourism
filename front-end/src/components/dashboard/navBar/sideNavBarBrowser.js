import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import Dashboard from '@material-ui/icons/Dashboard';
import Home from '@material-ui/icons/Home';
import Faq from '@material-ui/icons/QuestionAnswer';
import Permphone from '@material-ui/icons/PermPhoneMsg';
import Settings from '@material-ui/icons/Settings';
import Store from '@material-ui/icons/Store';
import Terrain from '@material-ui/icons/Terrain';
import Exittoapp from '@material-ui/icons/ExitToApp';
import Movie from '@material-ui/icons/Movie';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const sideNavBarBrowser = [
    {
        title: 'Dashboard',
        to: '/dashboard',
        icon: <Dashboard />
    },
    {
        title: 'Booking',
        to: '/dashboard/booking',
        icon: <Store />
    },
    {
        title: 'Media',
        to: '/dashboard/media',
        icon: <Terrain />
    },
    {
        title: 'Contact Us',
        to: '/dashboard/contact',
        icon: <Permphone />
    },
    {
        title: 'FAQ',
        to: '/dashboard/faq',
        icon: <Faq />
    },
    {
        title: 'Home',
        to: '/dashboard/home',
        icon: <Home />
    },
    {
        title: 'Resources',
        to: '/dashboard/resources',
        icon: <Movie />
    },
];

const settingOptions = [
    {
        title: 'Settings',
        to: '/dashboard/settings',
        icon: <Settings />
    },
];

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        marginLeft: drawerWidth,
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    drawerPaper: {
        width: drawerWidth,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
});

class SideDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openDrawer: false
        };
        this.handleCloseDrawer = this.props.handleCloseDrawer.bind(this)
        this.logout = this.logout.bind(this)
    }

    logout() {
        const { logout } = this.props;
        logout();
    }

    render() {
        const { classes } = this.props
        return (
            <div>
                <div className={classes.toolbar}/>
                    <div className={classes.drawerHeader}>
                    </div>
                <Divider/>
                <List>
                    {sideNavBarBrowser.map((text) => (
                        <ListItem button key={text.title} component={Link} to={text.to}>
                            <ListItemIcon>{text.icon}</ListItemIcon>
                            <ListItemText primary={text.title}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {settingOptions.map((text) => (
                        <ListItem button key={text.title} component={Link} to={text.to}>
                            <ListItemIcon>{text.icon}</ListItemIcon>
                            <ListItemText primary={text.title}/>
                        </ListItem>
                    ))}
                    <ListItem button key='Logout' onClick={this.logout}>
                        <ListItemIcon><Exittoapp /></ListItemIcon>
                        <ListItemText primary='Logout'/>
                    </ListItem>
                </List>
            </div>
        )
    }
}

SideDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
    };
}

function matchDispatchToProps(dispatch){
    return {

    }
}


export default connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)(withRouter(SideDrawer)));
