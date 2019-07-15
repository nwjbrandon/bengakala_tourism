import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  menuItem: {
    textTransform: 'uppercase',
  }
}));

const sections = ['stories', 'booking', 'explore', 'contact', 'faq'];
const navlinks = sections.map(section => {
  return (
    <Button key={section} color="inherit" component={Link} to={section}>{section}</Button>
  )
});

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: '#21212180' }}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Button color="inherit" component={Link} to="/" >Bengkala</Button>
          </Typography>
          <Hidden xsDown>
            {navlinks}
          </Hidden>
          <Hidden smUp>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu" onClick={handleClick}>
              <MenuIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {
                sections.map(section => (
                  <MenuItem className={classes.menuItem} onClick={handleClose} component={Link} to={section} key={section}>
                    {section}
                  </MenuItem>
                ))
              }
            </Menu>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
}
