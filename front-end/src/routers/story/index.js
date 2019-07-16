import React from 'react';
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
import { Link } from 'react-router-dom';

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
});

class Story extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const url = window.location.pathname;
    const tag = url.substring(url.lastIndexOf('story/s/') + 8);
    const { onMount } = this.props;
    onMount(tag);
  }

  componentWillReceiveProps() {
    const url = window.location.pathname;
    const tag = url.substring(url.lastIndexOf('story/s/') + 8);
    const { onMount } = this.props;
    onMount(tag);
  }

  render() {
    const { classes, latestStories, story } = this.props;
    return (
      <div className={classes.root}>
        <Navbar />
        <div className={classes.paper}>
          <Grid container justify="center" spacing={3}>
            <Grid item xs={12} md={8}>
              {
                story ?
                    <div>
                      <Grid container justify="center">
                        <Typography variant="h4" style={{ paddingBottom: 20 }}>
                          { story.title }
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
                        <Typography variant="body2" style={{ paddingBottom: 50 }}>
                          { dateFnsFormat(story.createdAt, 'YYYY/MM/DD HH:mm') }
                        </Typography>
                      </Grid>
                      <Grid container justify="center" style={{ paddingBottom: 30 }}>
                        <Grid item xs={12} sm={10}>
                          {
                            story.summary ? story.summary.split("\n").map((i,key) => (
                                <Typography variant="h6" style={{ marginTop: '10px', marginBottom: '10px' }} key={key}>{i}</Typography>
                            )) : <div />
                          }
                        </Grid>
                      </Grid>
                      <Grid container justify="center">
                        <Grid item xs={12} sm={10}>
                          {
                            story.text ? story.text.split("\n").map((i,key) => (
                                <Typography variant="body1" style={{ marginTop: '10px', marginBottom: '10px' }} key={key}>{i}</Typography>
                            )) : <div />
                          }
                        </Grid>
                      </Grid>
                    </div> :
                    <div>
                      <Grid container justify="center">
                        <Typography variant="h5" style={{ paddingBottom: 20 }}>
                          The story you are looking for cannot be found.
                        </Typography>
                      </Grid>
                    </div>

              }
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid container justify="center">
                <Typography variant="h6" style={{ paddingBottom: 20 }}>
                  Latest Stories
                </Typography>
              </Grid>
              {
                latestStories.map(stories => (
                    <Grid container justify="center" spacing={2}>
                      <Grid item xs={12} sm={8} md={10}>
                        <Grid container justify="center">
                          <Card className={classes.card}>
                            <CardActionArea component={Link}  to={stories.link}>
                              <CardMedia
                                  className={classes.media}
                                  image={stories.imgUrl}
                                  title={stories.title}
                              />
                              <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                  { stories.title }
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                  { stories.summary }
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
      </div>
    )
  }
}

export default withStyles(styles)(Story);
