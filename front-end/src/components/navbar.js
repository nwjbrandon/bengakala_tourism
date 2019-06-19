import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Route , NavLink } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const navLinks = {
  listStyle: 'none',
  color: 'inherit',
  textDecoration: 'none',
  justifyContent: 'space-around',
}

const sections =['About', 'Accommodation', 'Admin', 'Attraction', 'Tutorial' ,'Contact', 'Dashboard', 'FAQ'];
const navlinks = sections.map( section => {
    return(
      <Button key = {section} color="inherit"><NavLink exact style={navLinks} to = {"/" + section} activeStyle = {{color: '#fa923f'}}>{section}</NavLink></Button>
    )
});

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <NavLink style = {
              {listStyle: 'none',
              color: 'inherit',
              textDecoration: 'none'}
          } exact to = {"/"} >Bengkala</NavLink>
          </Typography>
          {//<Button color="inherit"><a style={navLinks} href={'/'}>Home</a></Button>
            }
          {navlinks}
        </Toolbar>
      </AppBar>
    </div>
  );
}
