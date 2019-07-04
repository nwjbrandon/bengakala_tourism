import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 800,
  },
  segment: {
    margin: '0',
    paddingTop: '60px',
    paddingBottom: '45px',
  },
  container: {
    boxSizing: 'border-box',
    maxWidth: '1290px',
    marginLeft: '100px',
    marginRight: '100px',
    position: 'relative',
  },
  articleStyle: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    boxSizing: 'inherit',
    textSizeAdjust: '100%',
  },
  myTextstyle: {
    color: 'rgb(44,54,67)',
    fontSize: '16px',
    lineHeight: '26px',
  }
});

const contentHeader = {
  margin: '0',
  fontSize: '28px',
  color: '#3b444f',
  fontWeight: '100',
  textAlign: 'center',
  paddingTop: '0',
  lineHeight: '1.3',
  marginTop: '0',
  position: 'relative',
  textSizeAdjust: '100%',
};
const separator ={
  backgroundColor: '#f8304b',
  display: 'block',
  width: '85px',
  height: '2px',
  margin: '0 auto',
  marginBottom: '30px',
  marginTop: '15px',
  verticalAlign: 'baseline',
  opacity: '1',
};
const contentNarrative={
  boxSizing: 'border-box',
  color: '#2C3643',
  display: 'block',
  fontSize: '18px',
  fontWeight: '100',
  marginTop: '25px',
  marginBottom: '25px',
  textSizeAdjust: '100%',
  lineHeight: '28px',
  textAlign: 'center',
};

const myTitlestyle={
  boxSizing: 'inherit',
  fontSize: '20px',
  diplay: 'block',
  fontWeight: '600',
  lineHeight: '30px',
  marginBlockEnd: '10px',
  marginBlockStart: '25px',
  marginBottom: '10px',
  marginTop: '25px',
  textAlign: 'left',
  textRendering: 'optimizelegibility',
  textSizeAdjust: '100%',
};

const myTextstyle = {
  color: 'rgb(44,54,67)',
  fontSize: '16px',
  lineHeight: '26px',
};


class Content extends Component {
  componentDidMount() {
    const { onMount } = this.props;
    onMount();
  }

  render() {
    const { stories, mission, classes } = this.props;
    return(
      <div className={classes.root}>
        <div className={classes.paper}>
          <h2 style={contentHeader}> Welcome to Bengkala Village </h2>
          <div style={separator} />
          <div style={contentNarrative}>
            <p>{ mission }</p>
          </div>
          <div>
            {
              stories.map(text => (
                  <div key={text.title}>
                    <h2 style={myTitlestyle}>
                      {text.title}
                    </h2>
                    <p style={myTextstyle}>
                      {text.text}
                    </p>
                  </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Content)
