import React from 'react';
import API from '../../api';

import bg from '../../components/accomodations/images/balivillage.jpg'
import Tutorial from '../../components/tutorials/VideoTutorials'
import Navbar from '../../components/navBar/navbar'
import Typography from '@material-ui/core/Typography';

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
      padding: 50 ,
      backgroundPosition: "top",
      backgroundRepeat: "initial",
      backgroundSize: "cover",
      // height:"250vh",
      minHeight:"100vh",
      width:"auto",
      backgroundImage: `url(${bg})`,
      textAlign:"left",
      justifyContent:"center"

  };
    return (
      <div style = {{margin: "0px" ,padding:"0px"}}>
        <div style = {divStyle}>
          <Tutorial />
        </div>
      </div>
    )
  }
}

export default TutorialPage
