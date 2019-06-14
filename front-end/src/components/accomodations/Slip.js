import React, { Component } from 'react';
import MasterTable from './Tabular';

/* a fake customer */
const personalDetails = {
  firstName: "John",
  lastName:"Doe",
  email: "fake@gmail.com",
  country: "fakeCountry",
};



class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      personalDetails: personalDetails,
    }
  }

  render() {
    const { personalDetails }  = this.state

    return (
      <div className='flex-center container medium-border-surround'>
        <h1 className='header-lg center-text'>
          Here's your invoice
        </h1>
        <div className='customer-details semi-bold'>
          <p> Billing informatiion </p>
          <h4 className='header-sm left-text'>
            {personalDetails.firstName} {personalDetails.lastName} from {personalDetails.country}
          </h4>
          <h4 className='header-sm left-text'>
            {personalDetails.email}
          </h4>
          <div class='price-breakdown medium-border-top medium-border-bottom'>
            <h4 className='header-sm'>
              Price Breakdown
            </h4>
            <MasterTable />
          </div>
          <div className='vert-space'/>
        </div>
      </div>
    );
  }
}

export default App
