import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    minHeight: "50%"
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 800,
  },
  bottomPaper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 800,
    minHeight: "50%"
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
  },
  media: {
    height: 100,
    paddingTop: '56.25%', // 16:9
  },
  card: {
    maxHeight: 345,
  },
});


class Content extends Component {
  componentDidMount() {
    const { onMount } = this.props;
    onMount();
  }

  render() {

    const titleHeader = {
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
      fontFamily: "Montserrat, sans-serif",
    };

    const separator = {
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

    const myTextstyle = {
      color: 'rgb(44,54,67)',
      fontSize: '16px',
      lineHeight: '26px',
      fontFamily: "Montserrat, sans-serif",
    };

    const { stories, mission, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.paper}>
          <h2 style={titleHeader}>{mission.title}</h2>
          <div style={separator} />
          <div>
            {
              mission.text ?
                mission.text.split("\n").map((i, key) => (
                  <div style={myTextstyle} key={key}>{i}</div>
                )) : <div />
            }
          </div>
        </div>
        <div className={classes.bottomPaper}>
          <Grid justify="center" container>
            <Grid item xs={12} md={6}>

              <Grid justify="center" container>
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  component={Link}
                  to="/stories/p/1"
                  style={{
                    marginBottom: 50,
                    backgroundColor: 'teal',
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  Listen to our stories!
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>

              <Grid justify="center" container>
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  component={Link}
                  to="/explore"
                  style={{
                    marginBottom: 50,
                    backgroundColor: 'teal',
                    fontFamily: "Montserrat, sans-serif",
                  }}
                >
                  Explore our village!
                </Button>
              </Grid>
            </Grid>

          </Grid>
        </div>
        <div>
          {/*
            stories.map((text, index) => (
              <div key={index}>
                <Grid justify="center" container>
                  <Grid item xs={12}>
                    <Card style={{
                      backgroundImage: `url(${text.imgUrl})`,
                      margin: 'none auto',
                      backgroundSize: 'cover',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      position: 'relative',
                      maxWidth: '100%',
                      boxSizing: 'inherit',
                      minHeight: '400px'
                    }}

                    >
                      <Hidden smDown>
                        {
                          index % 2 === 0 ?
                            <Grid
                              justify="flex-start" container>
                              <Grid item xs={4} style={{
                                backgroundColor: 'black',
                                opacity: 0.6,
                                minHeight: '400px'
                              }}>
                                <CardContent>
                                  <Typography variant="h5" style={{
                                    color: "white",
                                    fontWeight: "bold"
                                  }}>
                                    {text.title}
                                  </Typography>
                                  <Typography variant="body1" style={{
                                    color: "white"
                                  }}>
                                    {text.text.split("\n").map((i, key) => (
                                      <div style={{ marginTop: '10px', marginBottom: '10px' }} key={key}>{i}</div>
                                    ))}
                                  </Typography>
                                </CardContent>
                              </Grid>
                            </Grid> :
                            <Grid
                              justify="flex-end" container>
                              <Grid item xs={4} style={{
                                backgroundColor: 'black',
                                opacity: 0.6,
                                minHeight: '400px'
                              }}>
                                <CardContent>
                                  <Typography variant="h5" style={{
                                    color: "white",
                                    fontWeight: "bold"
                                  }}>
                                    {text.title}
                                  </Typography>
                                  <Typography variant="body1" style={{
                                    color: "white"
                                  }}>
                                    {text.text.split("\n").map((i, key) => (
                                      <div style={{ marginTop: '10px', marginBottom: '10px' }} key={key}>{i}</div>
                                    ))}
                                  </Typography>
                                </CardContent>
                              </Grid>
                            </Grid>
                        }
                      </Hidden>
                    </Card>
                  </Grid>
                </Grid>
                <Hidden mdUp>
                  <Grid
                    justify="center" container>
                    <Grid item xs={12} style={{
                      backgroundColor: 'black',
                      opacity: 0.6,
                      minHeight: '400px'
                    }}>
                      <CardContent>
                        <Typography variant="h5" style={{
                          color: "white",
                          fontWeight: "bold"
                        }}>
                          {text.title}
                        </Typography>
                        <Typography variant="body1" style={{
                          color: "white"
                        }}>
                          {text.text.split("\n").map((i, key) => (
                            <div style={{ marginTop: '10px', marginBottom: '10px' }} key={key}>{i}</div>
                          ))}
                        </Typography>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Hidden>
              </div>
            ))*/
          }


        </div>


      </div>
    );
  }
}

export default withStyles(styles)(Content)
