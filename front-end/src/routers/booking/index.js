import React from 'react';
import AccomodationsForm from '../../components/booking/Accomodations';

import Navbar from "../../components/navBar/navbar";
import bg from '../../assets/img/bgHouse.jpg'

import { connect } from 'react-redux'

import ImageCarousell from '../../components/booking/ImageCarousell/ImageCarousell'
// import kiwi from '/assets/img/kiwi.svg'

class Accomodation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    }
  }

  render() {

    const divStyle = {
      paddingBottom: 50,
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

