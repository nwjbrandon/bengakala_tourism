import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
      <Button color="inherit"><a style={navLinks} href={'/' + section}>{section}</a></Button>
    )
});

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Bengkala
          </Typography>
          {navlinks}
        </Toolbar>
      </AppBar>
    </div>
  );
}
