import React from 'react';
import API from '../../api';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// import './attraction.css'
const data = {
  "Funny Random Meme Dump":
    [{ imgUrl: "https://i.imgur.com/WfkZGD7.jpg", text: "Come visit our museum located within the serene and tranquil Kranji countryside area in Singapore to uncover the myths and discover the benefits of edible bird’s nest for we are probably one of the most comprehensive collection of information about edible bird’s nest in the entire South-East Asia." }],
  "Napping with my human":
    [{ imgUrl: "https://i.imgur.com/BMQIj5o.jpg", text: "At World of Birdnest Museum, we aim to play an educational role in sharing the information in depth about edible bird’s nest, the swiftlet species which their secretion produces the edible bird’s nest. We also curate works on caves bird’s nest to nests from swiftlet’s ranching farms and about sustainable farming, its trade and the past and ongoing scientific development on the medicinal properties of edible bird’s nest." }]
};

class Attraction extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      storyArray: { imgTitle: "this is the image title", imgUrl: "https://i.imgur.com/gPRyVXo.jpg", story: "this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example this is an example" }

    }
  }
  componentDidMount() {
    API.get('/attraction').then(res => {
      console.log("RES");
      console.log(res);
      this.setState({ data: res });
    })
  }
  render() {
    const cardRow = Object.keys(data).map(key =>
      data[key].map((item, index) => (
        <React.Fragment>
          <li>
            <Card raised="true" style={{ height: "400px", maxWidth: "350px" }}>
              <CardActionArea>
                <div align="center" style={{ paddingTop: "5px", marginTop: "10px" }}><img
                  src={item.imgUrl}
                  title={key} style={{ maxHeight: "200px" }}
                /></div>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {key}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {item.text}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Read More
            </Button>
              </CardActions>
            </Card>
          </li>
        </React.Fragment>
      ))
    );

    return (
      <div>
        <ul>{cardRow}</ul>
      </div>
    )
  }
}

export default Attraction
