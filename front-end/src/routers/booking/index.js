import React from 'react';
import API from '../../api';
import AccomodationsForm from '../../components/accomodations/Accomodations';

import bg from '../../components/accomodations/images/balivillage.jpg';

import { createStore } from 'redux'
import reducer from '../../reducers/accomodation'
import { Provider } from 'react-redux'
import Navbar from "../../components/navBar/navbar";

const store = createStore(reducer);

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
      store.dispatch({ type: "EXCLUDE_DATES", payload: res.excludedData })
      // this.setState({ data: res });
    })
  }
  render() {

    var divStyle = {
      padding: 25,
      width: "100%",
      height: "100%",
      textAlign: "center",
      backgroundColor: 'aquamarine',
      margin: 0,

    };

    var containerdivStyle = {
      width: "auto",
      height: "auto",
      backgroundColor: 'aquamarine',
      margin: 0,
      padding: 0

    };
    return (
      <div style={containerdivStyle}>
        <Provider store={store}>
          <Navbar />
          <div style={divStyle}>
            <AccomodationsForm />
          </div>
        </Provider>
      </div>

    )
  }
}

export default Accomodation
