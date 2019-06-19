import React from 'react';
import API from '../../api';
import Slideshow from '../../components/accomodations/Slideshow'
import bg from '../../components/accomodations/images/balivillage.jpg'
import Tutorial from '../../components/accomodations/TutorialPage'
import Navbar from '../../components/navbar'

import Container from '@material-ui/core/Container';

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
     width:"50%",
     float:"left"
  };

    return (
      <div>
        <h2 align = "center">{this.state.storyArray.imgTitle}</h2>
        <p style={halfStyle}>{this.state.storyArray.story} </p>
        <img src={this.state.storyArray.imgUrl} style={halfStyle}/>
      </div>
    )
  }
}

export default Attraction
