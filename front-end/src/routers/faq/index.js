import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import bg from './pics/faqbackground.jpg';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  bgImage: {
    paddingTop: 50,
    paddingBottom: 50,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
    backgroundImage: `url(${bg})`,
  },
  paper: {
    width: 450,
    margin: 'auto',
    [theme.breakpoints.up(550 + theme.spacing(6))]: {
      width: 600,
    },
  },
});

class Faq extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { onMount } = this.props;
    onMount();
  }

  render() {
    const { classes, data } = this.props;
    return (
      <React.Fragment>
        <div className={classes.root}>
          <div className={classes.bgImage}>
            <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
            >
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Grid container alignContent='center'>
                    <Typography variant="h4" style={{ paddingTop: 20, margin: 'auto' }}>
                      Frequently Asked Questions
                    </Typography>
                  </Grid>
                  {
                    Object.keys(data).map(FAQ_TYPE => (
                        <div>
                          <Grid container alignContent='center'>
                            <Typography
                                component="span"
                                variant="h5"
                                color="textPrimary"
                                style={{ paddingTop: 20, margin: 'auto' }}
                            >
                              { FAQ_TYPE }
                            </Typography>
                          </Grid>
                          {
                            data[FAQ_TYPE].map(datum => (
                                <div style={{ padding: 20 }}>
                                  <div>
                                    <Typography
                                        component="span"
                                        variant="h6"
                                        color="textPrimary"
                                        style={{ paddingTop: 10 }}
                                    >
                                      { datum.question }
                                    </Typography>
                                  </div>
                                  <div>
                                    <Typography
                                        component="span"
                                        variant="body1"
                                        color="textPrimary"
                                        style={{ paddingDown: 10 }}
                                    >
                                      { datum.answer }
                                    </Typography>
                                  </div>
                                  <Divider />
                                </div>
                            ))
                          }
                        </div>
                    ))
                  }
                </Paper>
              </Grid>
            </Grid>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Faq);
