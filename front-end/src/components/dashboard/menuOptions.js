import InboxIcon from '@material-ui/core/SvgIcon/SvgIcon';
import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {Link} from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";

const menuOptions = [
    {
        title: 'Dashboard',
        to: '/dashboard',
        icon: <InboxIcon />
    },
    {
        title: 'About',
        to: '/dashboard/about',
        icon: <InboxIcon />
    },
    {
        title: 'Attraction',
        to: '/dashboard/attraction',
        icon: <InboxIcon />
    },
]

const settingOptions = [
    {
        title: 'Settings',
        to: '/dashboard/settings'
    },
    {
        title: 'Logout',
        to: '/admin'
    }
]

const drawer = (
    <div>
        <div className={classes.toolbar} />
        <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleOpenDrawer}>
                <ChevronLeftIcon />
            </IconButton>
        </div>
        <Divider />
        <Divider />
        <List>
            {menuOptions.map((text, index) => (
                <ListItem button key={text.title} component={Link} to={text.to}>
                    <ListItemIcon>{ text.icon }</ListItemIcon>
                    <ListItemText primary={text.title} />
                </ListItem>
            ))}
        </List>
        <Divider />
        <List>
            {settingOptions.map((text, index) => (
                <ListItem button key={text.title} component={Link} to={text.to}>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text.title} />
                </ListItem>
            ))}
        </List>
    </div>
)

export default drawer;