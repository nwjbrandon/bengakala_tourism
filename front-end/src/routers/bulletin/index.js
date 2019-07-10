import React from 'react';
import Modal from '../../components/bulletin/Modal'
import Navbar from "../../components/navBar/navbar";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import _div from 'lodash/divide';
import _floor from 'lodash/floor';
import dateFnsFormat from 'date-fns/format';
import SuccessToast from "../../components/snackBar/successSnackBar.container";
import ErrorToast from "../../components/snackBar/errorSnackBar.container";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    width: '90%',
    [theme.breakpoints.up(450)]: {
      width: 450,
    },
    [theme.breakpoints.up(700)]: {
      width: 600,
    },
    margin: `${theme.spacing(3)}px auto`,
  },
  buttons: {
    width: '90%',
    [theme.breakpoints.up(450)]: {
      width: 450,
    },
    margin: `${theme.spacing(3)}px auto`,
  }
});

class Attraction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "", openModal: false, title: "", imgUrl: "",
      page: 0, rowsPerPage: 5,
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
  }

  handleOpenModal = ({ text, title, imgUrl }) => {
    this.setState({ text, openModal: true, title, imgUrl });
  };

  handleCloseModal = () => {
    this.setState({ openModal: false });
  };

  handleNext = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 })
  };

  handlePrevious = () => {
    const { page } = this.state;
    this.setState({ page: page - 1 })
  };

  componentDidMount() {
    const { onMount } = this.props;
    onMount();
  }

  render() {
    const { classes, data } = this.props;
    const { page, rowsPerPage } = this.state;
    const maxPage = _floor(_div(data.length, rowsPerPage));

    return (
        <div className={classes.root}>
          <Navbar />
          {
            data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => (
                <Card className={classes.card} key={item.title}>
                  <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={item.title}
                        height="140"
                        image={item.imgUrl}
                        title={item.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="body2" component="h2">
                        { dateFnsFormat(item.createdAt, 'YYYY/MM/DD HH:mm') }
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        { item.title }
                      </Typography>
                      <Typography variant="body1" color="textSecondary" component="p">
                        { item.summary }
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" value={item} color="primary" onClick={() => this.handleOpenModal({...item})}>
                      Read More
                    </Button>
              </CardActions>
            </Card>
          ))
        }
        <Modal {...this.state} onCloseModal={this.handleCloseModal} />
        <Grid container justify="center" spacing={10} className={classes.buttons}>
          <Button size="small" color="primary" onClick={this.handlePrevious} disabled={page === 0} >
            <KeyboardArrowLeft /> Previous Page
            </Button>
          <Button size="small" color="primary" onClick={this.handleNext} disabled={page === maxPage}>
            Next Page <KeyboardArrowRight />
          </Button>
        </Grid>
        <SuccessToast />
        <ErrorToast />
      </div>
    )
  }
}

export default withStyles(styles)(Attraction);
