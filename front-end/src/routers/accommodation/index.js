import React from 'react';
import API from '../../api';
import AccomodationsForm from './Components/Accomodations'
import bg from './images/balivillage.jpg'

class Accomodation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    }
  }
  componentDidMount() {
    API.get('/accommodation').then(res => {
      this.setState({ data: res });
    })
  }
  render() {

    var divStyle = {
      padding: 50 ,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      height:"150vh",
      width:"100%",
      backgroundImage: `url(${bg})`,
      textAlign:"left"

  };
    return (
      <div style = {divStyle}>
        <AccomodationsForm  />
      </div>
    )
  }
}

export default Accomodation
