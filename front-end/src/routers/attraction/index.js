import React from 'react';
import API from '../../api';
import Stories from '../../components/attractions/Stories'
import Slideshow from '../../components/attractions/Slideshow';
import bg from '../../components/accomodations/images/balivillage.jpg';

// import './attraction.css'

const data = {
  "Funny Random Meme Dump":
    [{ imgUrl: "https://i.imgur.com/WfkZGD7.jpg", text: "Come visit our museum located within the serene and tranquil Kranji countryside area in Singapore to uncover the myths and discover the benefits of edible bird’s nest for we are probably one of the most comprehensive collection of information about edible bird’s nest in the entire South-East Asia." }],
  "Napping with my human":
    [{ imgUrl: "https://i.imgur.com/BMQIj5o.jpg", text: "At World of Birdnest Museum, we aim to play an educational role in sharing the information in depth about edible bird’s nest, the swiftlet species which their secretion produces the edible bird’s nest. We also curate works on caves bird’s nest to nests from swiftlet’s ranching farms and about sustainable farming, its trade and the past and ongoing scientific development on the medicinal properties of edible bird’s nest." }],
  "Feme Dump":
    [{ imgUrl: "https://i.imgur.com/WfkZGD7.jpg", text: "Come visit our museum located within the serene and tranquil Kranji countryside area in Singapore to uncover the myths and discover the benefits of edible bird’s nest for we are probably one of the most comprehensive collection of information about edible bird’s nest in the entire South-East Asia." }],
  "Nappinith my human":
    [{ imgUrl: "https://i.imgur.com/BMQIj5o.jpg", text: "At World of Birdnest Museum, we aim to play an educational role in sharing the information in depth about edible bird’s nest, the swiftlet species which their secretion produces the edible bird’s nest. We also curate works on caves bird’s nest to nests from swiftlet’s ranching farms and about sustainable farming, its trade and the past and ongoing scientific development on the medicinal properties of edible bird’s nest." }],
  "Fun Meme Dump":
    [{ imgUrl: "https://i.imgur.com/WfkZGD7.jpg", text: "Come visit our museum located within the serene and tranquil Kranji countryside area in Singapore to uncover the myths and discover the benefits of edible bird’s nest for we are probably one of the most comprehensive collection of information about edible bird’s nest in the entire South-East Asia." }],
  "Napng with my human":
    [{ imgUrl: "https://i.imgur.com/BMQIj5o.jpg", text: "At World of Birdnest Museum, we aim to play an educational role in sharing the information in depth about edible bird’s nest, the swiftlet species which their secretion produces the edible bird’s nest. We also curate works on caves bird’s nest to nests from swiftlet’s ranching farms and about sustainable farming, its trade and the past and ongoing scientific development on the medicinal properties of edible bird’s nest." }],
  "Femump":
    [{ imgUrl: "https://i.imgur.com/WfkZGD7.jpg", text: "Come visit our museum located within the serene and tranquil Kranji countryside area in Singapore to uncover the myths and discover the benefits of edible bird’s nest for we are probably one of the most comprehensive collection of information about edible bird’s nest in the entire South-East Asia." }],

};

class Attraction extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      textArray: [
        { title: "This is title 1 ", text: "This is anulrejrfbksbdkcjaksjcbkasckjabsck long description 1. It is long so that i can see whether it still looks good on the website." },
        { title: "This is title 2", text: "This is description 2" },
        { title: "This is title 3", text: "This is description 3" },
        { title: "This is title 4", text: "This is description 4" },
        { title: "This is title 5", text: "This is description 5" },
        { title: "This is title 6", text: "This is description 6" },
      ]
    }
  }
  componentDidMount() {
    API.get('/attraction/info').then(res => {
      console.log("RES");
      console.log(res);
      this.setState({ data: res });
    })
  }
  render() {

    var divStyle = {
      padding: 50,
      backgroundPosition: "top",
      backgroundRepeat: "initial",
      backgroundSize: "cover",
      width: "auto",
      backgroundImage: `url(${bg})`,
      textAlign: "left"
    };

    return (
      <div style={divStyle}>
        <Stories data={data}
        />
        <Slideshow textArr={this.state.textArray} />
      </div>
    )
  }
}

export default Attraction
