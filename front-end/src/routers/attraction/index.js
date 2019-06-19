import React from 'react';
import API from '../../api';
import Slideshow from '../../components/accomodations/Slideshow'
import bg from '../../components/accomodations/images/balivillage.jpg'
import Tutorial from '../../components/accomodations/TutorialPage'
import Navbar from '../../components/navbar'

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './attraction.css'

class Attraction extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    storyArray: {imgTitle: "this is the image title", imgUrl: "https://i.imgur.com/gPRyVXo.jpg", story: "this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example"}
    }
  }
  componentDidMount() {
    API.get('/attraction').then(res => {
      this.setState({ data: res });
      console.log("RES");
      console.log(res);
    })
  }
  render() {

    var halfStyle = {
      justifyContent:"center",
     maxHeight:"200px",
  };
  var gridStyle = {
    paddingTop:"55px",
  }
    var gridItemStyle = {

      overflowX:"hidden",
      maxHeight:"350px",
    };

    var listStyle ={

      margin: 0,
      paddingTop:"55px",
      height: "auto",
      overflow: "scroll",
      listStyle: "none",
      whiteSpace: "nowrap",
      listStyleType: "none !important",

    }

    return (
      <div>
        <Navbar />
    <ul>
      <li>
        <Card raised= "true" style={{height:"400px", maxWidth:"350px"}}>
        <CardActionArea>
          <div align="center"><img
            src={this.state.storyArray.imgUrl}
            title={this.state.storyArray.imgTitle} style={{maxHeight:"200px"}}
          /></div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            {this.state.storyArray.imgTitle}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {this.state.storyArray.story}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
  <Button size="small" color="primary">
    Share
  </Button>
  <Button size="small" color="primary">
    Learn More
  </Button>
</CardActions>
      </Card>
      </li>
      <li>
        <Card raised= "true" style={{height:"400px", maxWidth:"350px"}}>
        <CardActionArea>
          <div align="center"><img
            src={this.state.storyArray.imgUrl}
            title={this.state.storyArray.imgTitle} style={{maxHeight:"200px"}}
          /></div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            {this.state.storyArray.imgTitle}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {this.state.storyArray.story}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
  <Button size="small" color="primary">
    Share
  </Button>
  <Button size="small" color="primary">
    Learn More
  </Button>
</CardActions>
      </Card>
      </li>
      <li>
        <Card raised= "true" style={{height:"400px", maxWidth:"350px"}}>
        <CardActionArea>
          <div align="center"><img
            src={this.state.storyArray.imgUrl}
            title={this.state.storyArray.imgTitle} style={{maxHeight:"200px"}}
          /></div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            {this.state.storyArray.imgTitle}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {this.state.storyArray.story}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
  <Button size="small" color="primary">
    Share
  </Button>
  <Button size="small" color="primary">
    Learn More
  </Button>
</CardActions>
      </Card>
      </li>
      <li>
        <Card raised= "true" style={{height:"400px", maxWidth:"350px"}}>
        <CardActionArea>
          <div align="center"><img
            src={this.state.storyArray.imgUrl}
            title={this.state.storyArray.imgTitle} style={{maxHeight:"200px"}}
          /></div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
            {this.state.storyArray.imgTitle}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {this.state.storyArray.story}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
  <Button size="small" color="primary">
    Share
  </Button>
  <Button size="small" color="primary">
    Learn More
  </Button>
</CardActions>
      </Card>
      </li>
      </ul>
      </div>
    )
  }
}

export default Attraction
