import React from 'react';
import API from '../../api';
import AccomodationsForm from '../../components/booking/Accomodations';

import Navbar from "../../components/navBar/navbar";
import bg from '../../assets/img/bgHouse.jpg'

import { connect } from 'react-redux'
import Particles from 'react-particles-js';

import ImageCarousell from '../../components/booking/ImageCarousell/ImageCarousell'
// import kiwi from '/assets/img/kiwi.svg'

class Accomodation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    }
  }
  componentDidMount() {
    API.get('/booking/info').then(res => {
      console.log("RES");
      console.log(res.excludedData);
      // store.dispatch({ type: "EXCLUDE_DATES", payload: res.excludedData })
      // this.setState({ data: res });
    })
  }
  render() {

    const divStyle = {
      padding: 0,
      marginTop: 0,
      width: "100%",
      minHeight: "100vh",
      height: "auto",
      margin: 0,
      backgroundImage: `url(${bg})`,
      maxWidth: "100%",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',

    };

    // const containerdivStyle = {
    //   width: "auto",
    //   height: "auto",
    //   backgroundColor: '#CCC',
    //   margin: 0,
    //   padding: 0

    // };
    return (
      <div >


        <div style={divStyle}>
          <Navbar />
          <AccomodationsForm />
        </div>

        <ImageCarousell />


      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    personalDetails: state.booking.personalDetails,
    tripDetails: state.booking.tripDetails,
    grossAmount: state.booking.grossAmount,
    errorMsg: state.booking.errorMsg
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onError: (val) => dispatch({ type: "ERR_MSG", payload: val }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Accomodation);

