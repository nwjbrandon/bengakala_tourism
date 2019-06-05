import React, { Component } from 'react';
import './css/Slip.css';
import Table from './Tabular';

/* a fake customer */
const customer= {
  name: "John Doe",
  email: "abcd@gmail.com",
  date: { in: "Friday, 18 April 2020", out: "Sunday, 27 April 2020" },
  duration: 9,
  groupSize: 20,
  home: { type: "Homestay", number: 5, price: 15 },
  mealPlan: {type: "Breakfast and Dinner",
    price: 10 },
  transport: {type: { van : 2, car: 3, motorbike: 1 },
    price: [40, 30, 15] },
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      customer: customer,
      costList: null,
      confirmation: false,
      edit: false,
    }

    this.costGenerator = this.costGenerator.bind(this)
  }

  componentWillMount () {
    this.costGenerator(this.state.customer)
  }

  costGenerator(customer) {
    const duration = customer.duration
    const groupSize = customer.groupSize

    const home_cost = customer.home.price * customer.home.number * duration
    const meal_cost = customer.mealPlan.price * duration * groupSize
    let transport_cost = 0
    if (customer.transport) {
      const t = customer.transport
      transport_cost = (t.type.van * t.price[0] + t.type.car * t.price[1] +
        t.type.motorbike * t.price[2]) * duration
    }

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
            {customer.name}
          </h4>
          <h4 className='header-sm left-text'>
            {customer.email}
          </h4>
          <h4 className='header-sm left-text'>
            {customer.date.in} - {customer.date.out}
          </h4>
          <h4 className='header-sm left-text'>
            Guests: {customer.groupSize}
          </h4>
          <div class='price-breakdown medium-border-top medium-border-bottom'>
            <h4 className='header-sm'>
              Price Breakdown
            </h4>
            <Table
              customer={customer}
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
