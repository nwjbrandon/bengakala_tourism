import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Link } from 'react-router-dom'
import Dashboard from '@material-ui/icons/Dashboard';
import Loyalty from '@material-ui/icons/Loyalty';
import Home from '@material-ui/icons/Home';
import Faq from '@material-ui/icons/QuestionAnswer';
import Payment from '@material-ui/icons/Payment';
import Permphone from '@material-ui/icons/PermPhoneMsg';
import Settingsapp from '@material-ui/icons/SettingsApplications';
import Settings from '@material-ui/icons/Settings';
import Store from '@material-ui/icons/Store';
import Terrain from '@material-ui/icons/Terrain';
import Exittoapp from '@material-ui/icons/ExitToApp';

const menuOptions = [
    {
        title: 'Dashboard',
        to: '/dashboard',
        icon: <Dashboard />
    },
    {
        title: 'About',
        to: '/dashboard/about',
        icon: <Loyalty />
    },
    {
        title: 'Accommodation',
        to: '/dashboard/accommodation',
        icon: <Store />
    },
    {
        title: 'Attractions',
        to: '/dashboard/attraction',
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
        title: 'Payment',
        to: '/dashboard/payment',
        icon: <Payment />
    },
]

const settingOptions = [
    {
        title: 'Settings',
        to: '/dashboard/settings',
        icon: <Settings />
    },
    {
        title: 'Logout',
        to: '/admin',
        icon: <Exittoapp />
    }
]

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
        }
        this.handleOpenDrawer = this.props.handleOpenDrawer.bind(this)
    }
    render() {
        const { classes } = this.props
        return (
            <div>
                <div className={classes.toolbar}/>
                <Hidden smUp implementation="css">
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleOpenDrawer}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </div>
                </Hidden>
                <Divider/>
                <Divider/>
                <List>
                    {menuOptions.map((text) => (
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
                </List>
            </div>
        )
    }
}

SideDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideDrawer);
