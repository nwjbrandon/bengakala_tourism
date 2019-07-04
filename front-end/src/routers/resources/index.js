import React from 'react';
import API from '../../api';

import bg from '../../components/accomodations/images/balivillage.jpg'
import Tutorial from '../../components/tutorials/VideoTutorials'
import Navbar from "../../components/navBar/navbar";

class TutorialPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    }
  }
  componentDidMount() {
    API.get('/resources').then(res => {
      this.setState({ data: res });
    })
  }
  render() {

    const divStyle = {
      padding: "2%",
      width: "auto",
      height: "150vh",
      textAlign: "left",
      justifyContent: "center"
    };

    return (
      <div>
        <Navbar />
        <div style={divStyle}>
          <Tutorial />
        </div>
      </div>
    )
  }
}

export default TutorialPage
