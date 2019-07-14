import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Navbar from "../../components/navBar/navbar";
import SuccessToast from "../../components/snackBar/successSnackBar.container";
import ErrorToast from "../../components/snackBar/errorSnackBar.container";
import TextField from "@material-ui/core/TextField";
import _debounce from 'lodash/debounce';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  searchBar: {
    padding: theme.spacing(2),
    backgroundColor: '#ffe2a4',
  },
  paper: {
    padding: theme.spacing(6),
  },
});

class Faq extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      filteredData: [],
      searching: false,
    };
  }

  componentDidMount() {
    const { onMount } = this.props;
    onMount();
  }

  setDisplayedContacts = _debounce(value => {
    const { searchData, } = this.props;
    let filteredData = searchData.filter(
        (datum) => {
          if (value.length <= 1) {
            return null;
          }
          return datum.answer.toLowerCase().indexOf(value) !== -1 ||
                 datum.question.toLowerCase().indexOf(value) !== -1;
        });
    this.setState({
      filteredData,
      searching: false,
    });
  }, 1000);

  handleChange = e => {
    this.setState({ value: e.target.value, searching: true, });
    let input = e.target.value.toLowerCase();
    this.setDisplayedContacts(input);
  };

  render() {
    const { classes, data } = this.props;
    const { value, filteredData, searching }  = this.state;
    return (
      <div>
        <Navbar />
        <div className={classes.root}>
          <Paper className={classes.searchBar}>
            <Grid justify="center" container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h4" style={{ paddingTop: 80 }}>
                  Hello, how can we help?
                </Typography>
              </Grid>
            </Grid>
            <Grid justify="center" container spacing={3} style={{ paddingBottom: 80 }}>
              <Grid item xs={12} md={6}>
                <TextField
                    placeholder="Search..."
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={value}
                    onChange={this.handleChange}
                />
              </Grid>
            </Grid>
          </Paper>
          <Paper  className={classes.paper}>
            {
              value.length <= 1 ?
                  Object.keys(data).map((FAQ_TYPE, index) => (
                      <div key={index} style={{ paddingTop: 20 }}>
                        <Grid justify="center" container>
                          <Grid item xs={12} md={8}>
                            <Typography
                                component="span"
                                variant="h5"
                                color="textPrimary"
                            >
                              { FAQ_TYPE }
                            </Typography>
                          </Grid>
                          <Grid item xs={12} md={8}>
                            <Typography>
                              {
                                data[FAQ_TYPE].map(datum=> (
                                    <Typography style={{ paddingTop: 20 }}>
                                      <Typography style={{ paddingTop: 10 }}>
                                        <Typography
                                            component="span"
                                            variant="h6"
                                            color="textPrimary"
                                        >
                                          Q:&nbsp;
                                        </Typography>
                                        { datum.question }
                                      </Typography>
                                      <Typography style={{ paddingTop: 10 }}>
                                        <Typography
                                            component="span"
                                            variant="h6"
                                            color="textPrimary"
                                        >
                                          A:&nbsp;
                                        </Typography>
                                        { datum.answer}
                                      </Typography>
                                    </Typography>
                                ))
                              }
                            </Typography>
                          </Grid>
                        </Grid>
                      </div>
                  ))
              :
              filteredData.length === 0 ?
              <div>
                <Grid justify="center" container>
                  {
                    searching ? "Please Wait": "No Results Found"
                  }
                </Grid>
              </div>
              :
              <div>
                {
                  filteredData.map((datum, index) => (
                      <div key={index} style={{ paddingTop: 20 }}>
                        <Grid justify="center" container>
                          <Grid item xs={12} md={8}>
                            <Typography>
                              <Typography style={{ paddingTop: 20 }}>
                                <Typography style={{ paddingTop: 10 }}>
                                  <Typography
                                      component="span"
                                      variant="h6"
                                      color="textPrimary"
                                  >
                                    Q:&nbsp;
                                  </Typography>
                                  { datum.question }
                                </Typography>
                                <Typography style={{ paddingTop: 10 }}>
                                  <Typography
                                      component="span"
                                      variant="h6"
                                      color="textPrimary"
                                  >
                                    A:&nbsp;
                                  </Typography>
                                  { datum.answer}
                                </Typography>
                                    </Typography>
                            </Typography>
                          </Grid>
                        </Grid>
                      </div>
                      )

                  )
                }
              </div>
            }
          </Paper>
        </div>
        <SuccessToast />
        <ErrorToast />
      </div>
    )
  }
}

export default withStyles(styles)(Faq);
