import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    padding: theme.spacing(3, 10),
  },
});

class Middlenav extends Component {
  PaperSheet(props) {}
  render() {

    const classes = this.props;

    const navWrap = {
      animation: 'fly-in 0.8s',
      overflowX: 'auto',
      overflowY: 'hidden',
      padding: '0',
      textAlign: 'center',
      transition: 'opacity .4s',
      whiteSpace: 'nowrap',
      width: '100%',
      listStyle: 'none',
    }

    const navLinks ={
      display: 'inline-block',
      lineHeight: '0',
      margin: '0',
      padding: '0',
    }

    const anchorStyle = {
    color: '#3b444f',
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: '500',
    padding: '0 10px',
    textTransform: 'uppercase',
    transition: 'color .3s ease-in',
    textDecoration: 'none',
    }

    const sections =['Accommodation', 'Attraction', 'Dashboard', 'FAQ'];
    const navlinks = sections.map( section => {
        return(
            <li style={navLinks}><a style={anchorStyle} href={'/' + section}>{section}</a></li>
        )
    });

    return (
    <div>
      <Paper className={classes.root}>
        <nav>
          <ul style={navWrap}>
            {navlinks}
          </ul>
        </nav>
      </Paper>
    </div>
    );
  }
};

export default Middlenav;
