import React from 'react';
import API from '../../api';
import Stories from '../../components/attractions/Stories'
import Slideshow from '../../components/attractions/Slideshow';
import bg from '../../components/accomodations/images/balivillage.jpg';

// import './attraction.css'

const data = [
  {
    title: "Funny Random Meme Dump",
    "imgUrl": "https://www.findingtheuniverse.com/wp-content/uploads/2017/12/Eiffel2BTower2BParis2B1_by_Laurence2BNorah255B4255D.jpg",
    "text": "Come visit our museum located within the serene and tranquil Kranji countryside area in Singapore to uncover the myths and discover the benefits of edible bird’s nest for we are probably one of the most comprehensive collection of information about edible bird’s nest in the entire South-East Asia."
  },
  {
    title: "Funny Random Meme Dump",
    "imgUrl": "https://www.findingtheuniverse.com/wp-content/uploads/2017/12/Eiffel2BTower2BParis2B1_by_Laurence2BNorah255B4255D.jpg",
    "text": "Come visit our museum located within the serene and tranquil Kranji countryside area in Singapore to uncover the myths and discover the benefits of edible bird’s nest for we are probably one of the most comprehensive collection of information about edible bird’s nest in the entire South-East Asia."
  },
  {
    title: "Funny Random Meme Dump",
    "imgUrl": "https://www.findingtheuniverse.com/wp-content/uploads/2017/12/Eiffel2BTower2BParis2B1_by_Laurence2BNorah255B4255D.jpg",
    "text": "Come visit our museum located within the serene and tranquil Kranji countryside area in Singapore to uncover the myths and discover the benefits of edible bird’s nest for we are probably one of the most comprehensive collection of information about edible bird’s nest in the entire South-East Asia."
  },
  {
    title: "Funny Random Meme Dump",
    "imgUrl": "https://www.findingtheuniverse.com/wp-content/uploads/2017/12/Eiffel2BTower2BParis2B1_by_Laurence2BNorah255B4255D.jpg",
    "text": "Come visit our museum located within the serene and tranquil Kranji countryside area in Singapore to uncover the myths and discover the benefits of edible bird’s nest for we are probably one of the most comprehensive collection of information about edible bird’s nest in the entire South-East Asia."
  },
]

class Attraction extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
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
    console.log("GEtting DAta");
    API.get('/attraction/info').then(res => {
      console.log("RES");
      console.log(res);
      this.setState({ data: res, loading: false });
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

    //     <Slideshow textArr={this.state.textArray} />

    return (
      <div >
        {this.state.loading ? <div>Loading</div> : <Stories data={data} />}


      </div>
    )
  }
}

export default Attraction
