import React from 'react';
import { withRouter } from "react-router-dom";
import Navbar from "../../components/navBar/navbar";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { Link } from 'react-router-dom';
import _toNumber from 'lodash/toNumber';
import dateFnsFormat from 'date-fns/format';
import SuccessToast from "../../components/snackBar/successSnackBar.container";
import ErrorToast from "../../components/snackBar/errorSnackBar.container";
import MyCard from './card'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    margin: `${theme.spacing(0)}px auto`,
  },
  buttons: {
    width: '90%',
    [theme.breakpoints.up(450)]: {
      width: 450,
    },
    margin: `${theme.spacing(3)}px auto`,
  },
});

class Attraction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
    this.handlePageNext = this.handlePageNext.bind(this);
    this.handlePagePrevious = this.handlePagePrevious.bind(this);
  }

  componentDidMount() {
    const url = window.location.pathname;
    const page = _toNumber(url.substring(url.lastIndexOf('stories/p/') + 10));
    const pageNumber = _toNumber(page) < 1 ? 1 : page;
    const { onMount } = this.props;
    onMount(pageNumber);
    this.setState({ page: pageNumber });
  }

  handlePagePrevious() {
    const { onMount } = this.props;
    const { page } = this.state;
    this.props.history.push(`/stories/p/${page - 1}`);
    onMount(page - 1);
    this.setState({ page: page - 1 });
  }

  handlePageNext() {
    const { onMount } = this.props;
    const { page } = this.state;
    this.props.history.push(`/stories/p/${page + 1}`);
    onMount(page + 1);
    this.setState({ page: page + 1 });
  }


  render() {
    const { classes, pageStories } = this.props;
    const { page, } = this.state;

    return (
      <div>
        <Navbar />
        <h3 style={{ fontSize: '2em', fontFamily: "Montserrat, sans-serif", paddingLeft: "5vw" }}>Listen to our Stories!</h3>
        <div style={{ padding: '10px' }}>
          <Grid justify="center" container spacing={3}>
            {
              pageStories.map(item => (
                <Grid item xs={12} md={6}>
                  <Card className={classes.card} key={item.title}>
                    <CardActionArea component={Link} to={`/story/s/${item.link}`}>
                      <MyCard src={item.imgUrl} date={dateFnsFormat(item.createdAt, 'YYYY/MM/DD HH:mm')} title={item.title} summary={item.summary} />
                    </CardActionArea>

                  </Card>
                </Grid>
              ))
            }
          </Grid>
        </div>
        <Grid container justify="center" spacing={10} className={classes.buttons}>
          <Button
              size="small"
              variant="contained"
              color="default"
              onClick={this.handlePagePrevious}
              disabled={page <= 1}
              style={{
                margin: 10
              }}
          >
            <KeyboardArrowLeft /> Previous
            </Button>
          <Button
              size="small"
              variant="contained"
              color="default"
              onClick={this.handlePageNext}
              disabled={pageStories.length < 6}
              style={{
                margin: 10
              }}
          >
            Next <KeyboardArrowRight />
          </Button>
        </Grid>
        <SuccessToast />
        <ErrorToast />
      </div>
    )
  }
}

export default withStyles(styles)(withRouter(Attraction));
