import React from 'react';
import API from '../../api';

import bg from '../../components/accomodations/images/balivillage.jpg'
import Tutorial from '../../components/tutorials/VideoTutorials'


class TutorialPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    }
  }
  componentDidMount() {
    API.get('/tutorial').then(res => {
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
      height: "150vh",
      backgroundImage: `url(${bg})`,
      textAlign: "left",
      justifyContent: "center"

    };

    // var divStyle = {
    //   padding: 50,
    //   backgroundPosition: "top",
    //   backgroundRepeat: "initial",
    //   backgroundSize: "cover",
    //   // height:"250vh",
    //   width: "100%",
    //   backgroundImage: `url(${bg})`,
    //   textAlign: "left"

    // };
    return (
      <div>
        <div style={divStyle}>
          <Tutorial />
        </div>
      </div>
    )
  }
}

export default TutorialPage
