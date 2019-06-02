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

const menuOptions = [
    {
        title: 'Dashboard',
        to: '/dashboard',
        icon: <InboxIcon />
    },
    {
        title: 'About',
        to: '/dashboard-about',
        icon: <InboxIcon />
    },
    {
        title: 'Accommodation',
        to: '/dashboard-accommodation',
        icon: <InboxIcon />
    },
    {
        title: 'Attraction',
        to: '/dashboard-attraction',
        icon: <InboxIcon />
    },
    {
        title: 'Contact',
        to: '/dashboard-contact',
        icon: <InboxIcon />
    },
    {
        title: 'FAQ',
        to: '/dashboard-faq',
        icon: <InboxIcon />
    },
    {
        title: 'Home',
        to: '/dashboard-home',
        icon: <InboxIcon />
    },
    {
        title: 'Payment',
        to: '/dashboard-payment',
        icon: <InboxIcon />
    },
]

const settingOptions = [
    {
        title: 'Settings',
        to: '/dashboard-settings',
        icon: <InboxIcon />
    },
    {
        title: 'Logout',
        to: '/admin',
        icon: <InboxIcon />
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