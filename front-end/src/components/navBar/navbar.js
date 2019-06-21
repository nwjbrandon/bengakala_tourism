import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const sections =['attraction',  'accommodation', 'tutorial' ,'contact', 'faq'];
const navlinks = sections.map( section => {
    return(
      <Button key = {section} color="inherit" component={Link} to={section}>{ section }</Button>
    )
});

export default function ButtonAppBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Button color="inherit" component={Link} to="/" >Bengkala</Button>
          </Typography>
          {navlinks}
        </Toolbar>
      </AppBar>
    </div>
  );
}
