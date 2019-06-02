import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Link } from 'react-router-dom'

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

const drawerWidth = 240;

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

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false
    }
    this.handleOpenDrawer = this.handleOpenDrawer.bind(this)
  }

  handleOpenDrawer() {
    const { openDrawer } = this.state
    this.setState({ openDrawer: !openDrawer })
  }

  render() {
    const { classes } = this.props
    const { openDrawer } = this.state
    return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                  color="inherit"
                  edge="start"
                  className={classes.menuButton}
                  onClick={this.handleOpenDrawer}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Admin Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer}>
            <Hidden smUp implementation="css">
              <Drawer
                  variant="temporary"
                  open={openDrawer}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                  }}
              >
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
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  variant="permanent"
                  open
              >
                <div>
                  <div className={classes.toolbar} />
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
              </Drawer>
            </Hidden>
          </nav>
        </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);