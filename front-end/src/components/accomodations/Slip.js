import React, { Component } from 'react';
import MasterTable from './Tabular';
import { connect } from 'react-redux'


/* a fake customer */
// const personalDetails = {
//   firstName: "John",
//   lastName:"Doe",
//   email: "fake@gmail.com",
//   country: "fakeCountry",
// };



class App extends Component {
  constructor(props) {
    super(props)

  }

  render() {

    return (
      <div className='flex-center container medium-border-surround'>
        <h1 style={{ color: 'white' }} className='header-lg center-text'>
          Here's your invoice
        </h1>
        <div style={{ color: 'white' }} className='customer-details semi-bold'>
          <p> Billing information </p>
          <h4 className='header-sm left-text'>
            {this.props.personalDetails.firstName} {this.props.personalDetails.lastName} from {this.props.personalDetails.country}
          </h4>
          <h4 className='header-sm left-text'>
            {this.props.personalDetails.email}
          </h4>
          <div>
            <h4 style={{ fontSize: "20px", color: 'black' }} className='header-sm'>
              Price Breakdown
            </h4>
            <MasterTable tripDetails={this.props.tripDetails} cost={this.props.cost} />
          </div>
          <div className='vert-space' />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    personalDetails: state.personalDetails,
    tripDetails: state.tripDetails,
    cost: state.cost,
  };
};


export default connect(mapStateToProps)(App)
