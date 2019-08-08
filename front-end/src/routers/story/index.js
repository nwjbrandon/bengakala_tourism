import React from 'react';
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Navbar from "../../components/navBar/navbar";
import {
  Grid,
  CardMedia,
  Card,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import dateFnsFormat from "date-fns/format";
import SEO from "../../components/seo";
import { seoTags } from "../../assets/data/seo";


import { ThemeProvider } from '@material-ui/styles';
import { green, } from '@material-ui/core/colors';

import { createMuiTheme, } from '@material-ui/core/styles';

import bg from '../../assets/img/bgimg3.jpg'
const styles = () => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    paddingTop: 50,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  card: {
    width: "100%",
  },
  justifyText: {
    allignText: "justify-center"
  }
});

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#fafafa",
    },
    primary: {
      main: green[500]
    }
  },
});

class Story extends React.Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    const url = window.location.pathname;
    const tag = url.substring(url.lastIndexOf('story/s/') + 8);
    const { onMount } = this.props;
    onMount(tag);
  }

  handlePageChange(tag) {
    const { onMount } = this.props;
    this.props.history.push(`/story/s/${tag}`);
    onMount(tag);
  }



  render() {
    const divStyle = {
      padding: 0,
      marginTop: 0,
      width: "100%",
      minHeight: "100vh",
      height: "auto",
      margin: 0,
      backgroundImage: `url(${bg})`,
      maxWidth: "100%",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',

    };
    const { classes, latestStories, story } = this.props;
    return (
      <div className={classes.root} style={divStyle}>
        <ThemeProvider theme={theme}>
          <SEO
            title={seoTags.story.title}
            description={seoTags.story.description}
            keywords={seoTags.story.keywords}
          />
          <Navbar />
          <div className={classes.paper}>
            <Grid container justify="center" spacing={3}>

              <Grid item xs={12} md={8}>
                {
                  story ?
                    <div style={{
                      background: "#21212190",
                      borderRadius: "10px",
                      paddingLeft: 20,
                      paddingRight: 20,
                      paddingTop: 10
                    }}>
                      <Grid container justify="center">
                        <Typography color="secondary" variant="h4" style={{ paddingBottom: 20 }}>
                          {story.title}
                        </Typography>
                      </Grid>
                      <Card style={{
                        backgroundImage: `url(${story.imgUrl})`,
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
                      }} />
                      <Grid container justify="flex-end">
                        <Typography color="secondary" variant="body2" style={{ paddingBottom: 10 }}>
                          {dateFnsFormat(story.createdAt, 'YYYY/MM/DD')}
                        </Typography>
                      </Grid>
                      <Grid container justify="center" style={{ paddingBottom: 30 }}>
                        <Grid item xs={12} sm={10}>
                          {
                            story.summary ? story.summary.split("\n").map((i, key) => (
                              <Typography color="secondary" variant="h6" style={{ marginTop: '10px', marginBottom: '10px' }} key={key}>{i}</Typography>
                            )) : <div />
                          }
                        </Grid>
                      </Grid>
                      <Grid container justify="center" style={{ textAlign: 'justify' }}>
                        <Grid item xs={12} sm={10}>
                          {
                            story.text ? story.text.split("\n").map((i, key) => (
                              <Typography color="secondary" variant="body1" style={{ marginTop: '10px', marginBottom: '10px' }} key={key}>{i}</Typography>
                            )) : <div />
                          }
                        </Grid>
                      </Grid>
                    </div> :
                    <div>
                      <Grid container justify="center">
                        <Typography color="secondary" variant="h5" style={{ paddingBottom: 20 }}>
                          The story you are looking for cannot be found.
                        </Typography>
                      </Grid>
                    </div>

                }
              </Grid>
              <Grid item xs={12} md={4}>
                <Grid container justify="center">
                  <Typography color="secondary" variant="h6" style={{ paddingBottom: 20 }}>
                    Latest Stories
                </Typography>
                </Grid>
                {
                  latestStories.map((stories, index) => (
                    <Grid key={index} container justify="center" spacing={2}>
                      <Grid item xs={12} sm={8} md={10}>
                        <Grid container justify="center">
                          <Card className={classes.card}>
                            <CardActionArea onClick={() => this.handlePageChange(stories.link)}>
                              <CardMedia
                                className={classes.media}
                                image={stories.imgUrl}
                                title={stories.title}
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                  {stories.title}
                                </Typography>
                                <Typography className={classes.justifyText} variant="body2" color="textSecondary" component="p" style={{ textAlign: 'justify' }}>
                                  {stories.summary}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))
                }
              </Grid>
            </Grid>
          </div>
        </ThemeProvider>
      </div>
    )
  }
}

export default withStyles(styles)(withRouter(Story));
