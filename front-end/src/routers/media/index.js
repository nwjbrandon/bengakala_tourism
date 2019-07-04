import React from 'react';
import Modal from '../../components/attractions/Modal'
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

const data = [
  {
    title: "Funny Random Meme Dump",
    description: "Come visit our museum located within the serene and tranquil Kranji countryside area in Singapore to uncover the myths and discover the benefits of edible bird’s nest for we are probably one of the most comprehensive collection of information about edible bird’s nest in the entire South-East Asia.",
    imgSrc: "https://d39gusjpdm7p1o.cloudfront.net/data/layout_grouping/static_page_step/20784_a330628091ede7eb1548d6cda58e0357.jpg?ver=1477297804"
  },
  {
    title: "Napping with my human",
    description: "At World of Birdnest Museum, we aim to play an educational role in sharing the information in depth about edible bird’s nest, the swiftlet species which their secretion produces the edible bird’s nest. We also curate works on caves bird’s nest to nests from swiftlet’s ranching farms and about sustainable farming, its trade and the past and ongoing scientific development on the medicinal properties of edible bird’s nest.",
    imgSrc: "https://cdn2.tourmontparnasse56.com/wp-content/uploads/2018/07/@david_fossa-2.jpg"
  },
  {
    title: "Feme Dump",
    description: "Come visit our museum located within the serene and tranquil Kranji countryside area in Singapore to uncover the myths and discover the benefits of edible bird’s nest for we are probably one of the most comprehensive collection of information about edible bird’s nest in the entire South-East Asia.",
    imgSrc: "https://static.amazon.jobs/locations/7/thumbnails/Paris_-_Thumbnail.jpg?1454183453"
  },
  {
    title: "Nappinith my human",
    description: "At World of Birdnest Museum, we aim to play an educational role in sharing the information in depth about edible bird’s nest, the swiftlet species which their secretion produces the edible bird’s nest. We also curate works on caves bird’s nest to nests from swiftlet’s ranching farms and about sustainable farming, its trade and the past and ongoing scientific development on the medicinal properties of edible bird’s nest.",
    imgSrc: "https://www.findingtheuniverse.com/wp-content/uploads/2017/12/Eiffel2BTower2BParis2B1_by_Laurence2BNorah255B4255D.jpg"
  },
  {
    title: "Fun Meme Dump",
    description: "Come visit our museum located within the serene and tranquil Kranji countryside area in Singapore to uncover the myths and discover the benefits of edible bird’s nest for we are probably one of the most comprehensive collection of information about edible bird’s nest in the entire South-East Asia.",
    imgSrc: "https://www.findingtheuniverse.com/wp-content/uploads/2017/12/Eiffel2BTower2BParis2B1_by_Laurence2BNorah255B4255D.jpg"
  },
  {
    title: "Napng with my human",
    description: "At World of Birdnest Museum, we aim to play an educational role in sharing the information in depth about edible bird’s nest, the swiftlet species which their secretion produces the edible bird’s nest. We also curate works on caves bird’s nest to nests from swiftlet’s ranching farms and about sustainable farming, its trade and the past and ongoing scientific development on the medicinal properties of edible bird’s nest.",
    imgSrc: "https://www.findingtheuniverse.com/wp-content/uploads/2017/12/Eiffel2BTower2BParis2B1_by_Laurence2BNorah255B4255D.jpg"
  },
  {
    title: "Femump",
    description: "Come visit our museum located within the serene and tranquil Kranji countryside area in Singapore to uncover the myths and discover the benefits of edible bird’s nest for we are probably one of the most comprehensive collection of information about edible bird’s nest in the entire South-East Asia.",
    imgSrc: "https://www.findingtheuniverse.com/wp-content/uploads/2017/12/Eiffel2BTower2BParis2B1_by_Laurence2BNorah255B4255D.jpg"
  }
];

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    width: '90%',
    [theme.breakpoints.up(450)]: {
      width: 450,
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
      description: "", openModal: false, title: "", imgSrc: "",
      page: 0, rowsPerPage: 5,
    };
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
  }

  handleOpenModal = ({ description, title, imgSrc }) => {
    this.setState({ description, openModal: true, title, imgSrc });
  };

  handleCloseModal = () => {
    this.setState({ openModal: false });
  };

  handleNext = () => {
    const { page } = this.state;
    this.setState({ page: page + 1})
  };

  handlePrevious = () => {
    const { page } = this.state;
    this.setState({ page: page - 1})
  };

  render() {
    const { classes } = this.props;
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
                        image={item.imgSrc}
                        title={item.title}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        { item.title }
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        { item.description }
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
        </div>
    )
  }
}

export default withStyles(styles)(Attraction);
