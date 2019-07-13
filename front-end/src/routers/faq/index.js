import React from 'react';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Navbar from "../../components/navBar/navbar";
import SuccessToast from "../../components/snackBar/successSnackBar.container";
import ErrorToast from "../../components/snackBar/errorSnackBar.container";

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: `${theme.spacing(3)}px auto`
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    width: '90%',
    [theme.breakpoints.up(450)]: {
      width: 450,
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
        <Navbar />
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Typography variant="h4" style={{ paddingTop: 10, margin: 'auto' }}>
              Frequently Asked Questions
            </Typography>
            <Grid justify="center" container spacing={3}>

            {
              Object.keys(data).map((FAQ_TYPE, index) => (
                  <Grid item xs={12} md={12} key={index}>
                    <Grid container alignContent='center'>
                      <Typography
                          component="span"
                          variant="h5"
                          color="textPrimary"
                          style={{ paddingTop: 10, margin: 'auto' }}
                      >
                        { FAQ_TYPE }
                      </Typography>
                    </Grid>
                    {
                      data[FAQ_TYPE].map((datum, index) => (
                          <div key={index} style={{ padding: 10 }}>
                            <div>
                              <Typography
                                  component="span"
                                  variant="h6"
                                  color="textPrimary"
                                  style={{ paddingTop: 5 }}
                              >
                                { datum.question }
                              </Typography>
                            </div>
                            <div>
                              <Typography
                                  component="span"
                                  variant="body1"
                                  color="textPrimary"
                                  style={{ paddingDown: 5 }}
                              >
                                { datum.answer }
                              </Typography>
                            </div>
                            <Divider />
                          </div>
                      ))
                    }
                  </Grid>
              ))
            }
            </Grid>
          </Paper>
        </div>
        <SuccessToast />
        <ErrorToast />
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Faq);
