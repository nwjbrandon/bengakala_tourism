import React from 'react';
import API from '../../api';
import AccomodationsForm from '../../components/booking/Accomodations';

import Navbar from "../../components/navBar/navbar";

import { connect } from 'react-redux'
import Particles from 'react-particles-js';
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
      padding: 25,
      width: "100%",
      minHeight: "100vh",
      height: "auto",
      textAlign: "center",
      backgroundColor: '#03A9F4',
      margin: 0,

    };

    // const containerdivStyle = {
    //   width: "auto",
    //   height: "auto",
    //   backgroundColor: '#CCC',
    //   margin: 0,
    //   padding: 0

    // };
    return (
      <React.Fragment>
        <Navbar />

        <div style={divStyle}>
          <AccomodationsForm />
        </div>

      </React.Fragment>

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

