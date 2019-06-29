import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    height: 800,
    margin: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    width: 450,
    [theme.breakpoints.up(500 + theme.spacing(6))]: {
      width: 500,
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
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Faq);
