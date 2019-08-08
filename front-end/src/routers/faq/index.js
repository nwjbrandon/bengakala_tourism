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
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Tab, Tabs } from '@material-ui/core';
import Divider from '@material-ui/core/Divider'
import bg from '../../assets/img/bgimg4.jpg'
import SEO from "../../components/seo";
import { seoTags } from "../../assets/data/seo";
const bg2 = 'https://i.postimg.cc/y8sM1r2K/IMG-8495.jpg'


const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundImage: `url(${bg2})`,
    backgroundSize: 'cover',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundPosition: 'fixed',
    backgroundRepeat: 'no-repeat',
  },
  searchBar: {
    padding: 0,
    // backgroundImage: `url(${bg2})`,
    //  backgroundSize: '100% auto',
    // backgroundPosition: 'fixed',
    //  backgroundRepeat: 'no-repeat',
     marginTop: '0'
  },
  searchBarItems: {
    height: "100%",
    width: "100%",
    maxWidth: "90vw",
    padding: theme.spacing(2),
    margin: 0,
  },
  paper: {
    padding: theme.spacing(2),
  },
  progress: {
    margin: theme.spacing(2),
  },
  textField: {
    background: "#DFDFDF",
    borderRadius: "10px"
  }

});


class Faq extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      val: 0,
      value: '',
      filteredData: [],
      searching: false,
      windowWidth: null,
    };
  }

  componentDidMount() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
    const { onMount } = this.props;
    onMount();
  }

  componentWillMount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => this.setState({
    windowWidth: window.innerWidth
  })

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

  handleTabChange = (e, newVal) => {
    this.setState({ val: newVal })
  }


  render() {
    const { classes, data } = this.props;
    const { value, filteredData, searching, val, windowWidth } = this.state;
    return (

      <div className={classes.root}>
        <SEO
          title={seoTags.faq.title}
          description={seoTags.faq.description}
          keywords={seoTags.faq.keywords}
        />
        <Navbar style={{marginBottom: 0}}/>
        <div>
          <div className={classes.searchBar}>
            <div className={classes.searchBarItems}>
              <Grid justify="center" container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography style={{ fontFamily: "Montserrat, sans-serif", paddingTop: 80, color: '#FFFFFF'  }} variant="h4">
                    Hello, how can we help?
                </Typography>
                </Grid>
              </Grid>
              <Grid justify="center" container spacing={3} style={{ paddingBottom: 80 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                   className = {classes.textField}
                    placeholder="Search..."
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={value}
                    onChange={this.handleChange}
                    InputProps={{
                      endAdornment: <SearchIcon />
                    }}
                  />
                </Grid>
              </Grid>
            </div>
          </div>
          <Paper className={classes.paper}>
            {
              value.length <= 1 ?
                <React.Fragment>
                  <Paper>
                    {windowWidth > 600
                      ?
                      <Tabs
                        value={val}
                        onChange={this.handleTabChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="fullWidth"
                      >
                        {Object.keys(data).map((FAQ_TYPE, index) => (
                          <Tab
                            key={index}
                            label={FAQ_TYPE}
                          />
                        ))}
                      </Tabs>
                      :
                      <Tabs
                        value={val}
                        onChange={this.handleTabChange}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="auto"
                      >
                        {Object.keys(data).map((FAQ_TYPE, index) => (
                          <Tab
                            key={index}
                            label={FAQ_TYPE}
                          />
                        ))}
                      </Tabs>
                    }
                  </Paper>
                  {Object.keys(data).map((FAQ_TYPE, index) => (
                    index === val ?
                      <div key={index} style={{ paddingTop: 20 }}>
                        <Grid container justify="center" style={{ textAlign: 'justify' }}>
                          <Grid item xs={12} md={8}>
                            <Typography>
                              {
                                data[FAQ_TYPE].map(datum => (
                                  <React.Fragment>

                                    <Typography style={{ fontFamily: "Montserrat, sans-serif", paddingTop: 20 }}>
                                      <Typography style={{ fontFamily: "Montserrat, sans-serif", paddingTop: 10 }}>
                                        <Typography
                                          component="span"
                                          variant="h6"
                                          color="textPrimary"
                                          style={{ fontFamily: "Montserrat, sans-serif", }}
                                        >
                                          Question:&nbsp;
                                              </Typography>
                                        {datum.question ? datum.question.split("\n").map((i, key) => (
                                          <Typography variant="body1" style={{ fontFamily: "Montserrat, sans-serif", marginTop: '10px', marginBottom: '10px' }} key={key}>{i}</Typography>)) : <div />
                                        }
                                      </Typography>
                                      <Typography style={{ fontFamily: "Montserrat, sans-serif", paddingTop: 10 }}>
                                        <Typography
                                          component="span"
                                          variant="h6"
                                          color="textPrimary"
                                          style={{ fontFamily: "Montserrat, sans-serif", }}
                                        >
                                          Answer:&nbsp;
                                              </Typography>
                                        {datum.answer ? datum.answer.split("\n").map((i, key) => (
                                          <Typography variant="body1" style={{ fontFamily: "Montserrat, sans-serif", marginTop: '10px', marginBottom: '10px' }} key={key}>{i}</Typography>)) : <div />
                                        }
                                      </Typography>
                                    </Typography>
                                    <Divider />
                                  </React.Fragment>
                                ))
                              }
                            </Typography>
                          </Grid>
                        </Grid>
                      </div>
                      : <Typography> </Typography>
                  ))}
                </React.Fragment>
                :
                filteredData.length === 0 ?
                  <div>
                    <Grid justify="center" container>
                      {
                        searching ? <CircularProgress className={classes.progress} color="secondary" /> : <Typography>No Results Found</Typography>
                      }
                    </Grid>
                  </div>
                  :
                  <div>
                    {
                      filteredData.map((datum, index) => (
                        <div key={index} style={{ paddingTop: 20 }}>
                          <Grid justify="center" container style={{ textAlign: 'justify' }}>
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
                                    {datum.question}
                                  </Typography>
                                  <Typography style={{ paddingTop: 10 }}>
                                    <Typography
                                      component="span"
                                      variant="h6"
                                      color="textPrimary"
                                    >
                                      A:&nbsp;
                                  </Typography>
                                    {datum.answer}
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
