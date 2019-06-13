import React, { Component } from 'react';
import Table from './Tabular';

/* a fake customer */
const personalDetails = {
  firstName: "John",
  lastName:"Doe",
  email: "fake@gmail.com",
  country: "fakeCountry",
};

const tripDetails = {
  checkIn: "18/04/2020",
  checkOut: "28/04/2020",
  breakfast: true,
  lunch :true ,
  dinner :true,
  numberMales: 7,
  numberFemales: 3,
  numberVans: 3,
  numberCars: 4,
  numberBikes: 2
};

const duration = 10

const prices = {
  home: 10,
  breakfast: 1,
  lunch :3 ,
  dinner :2,
  van: 15,
  car: 10,
  bike: 5
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      personalDetails: null,
      tripDetails: null,
      prices: null,
      costList: null,
      confirmation: false,
      edit: false,
    }

    this.costGenerator = this.costGenerator.bind(this)
  }

  componentDidMount() {
    this.setState({
      personalDetails: personalDetails,
      tripDetails: tripDetails,
      prices: prices,
    })
  }

  componentWillMount() {
    this.costGenerator(this.state.tripDetails, prices)
  }

  costGenerator(tripDetails, prices) {
    const t = tripDetails;
    const groupSize = t.numberMales + t.numberFemales

    const home_cost = prices.home * 5 * duration
    const meal_cost = customer.mealPlan.price * duration * groupSize
    const transport_cost = (t.van * prices.van + t.car * prices.car +
      t.bike * prices.bike) * duration

    const costArr = [home_cost, meal_cost, transport_cost]

    this.setState ({
      costList: costArr
    })

  }

  render() {
    const { customer, costList, confirmation, edit } = this.state

    return (
      <div className='flex-center container medium-border-surround'>
        <h1 className='header-lg center-text'>
          Here's your invoice
        </h1>
        <div className='customer-details semi-bold'>
          <h4 className='header-sm left-text'>
            {personalDetails.firstName} {personalDetails.lastName}
          </h4>
          <h4 className='header-sm left-text'>
            {personalDetails.email}
          </h4>
          <h4 className='header-sm left-text'>
            {tripDetails.checkIn} - {tripDetails.checkOut}
          </h4>
          <h4 className='header-sm left-text'>
            Guests: {groupSize}
          </h4>
          <div class='price-breakdown medium-border-top medium-border-bottom'>
            <h4 className='header-sm'>
              Price Breakdown
            </h4>
            <Table
              tripDetails={tripDetails}
              costList={costList}
            />
          </div>
          <div className='vert-space'/>

        </div>
      </div>
    );
  }
}

export default App
