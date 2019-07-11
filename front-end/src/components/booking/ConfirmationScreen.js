import React from 'react'
import 'react-calendar-heatmap/dist/styles.css';
import API from '../../api'


class ConfirmationScreen extends React.Component {

  componentDidMount() {

    API.post('/sendEmail', {
      toEmail: this.props.personalDetails.email,
      personalDetails: { ...this.props.personalDetails },
      tripDetails: { ...this.props.tripDetails },
      cost: this.props.cost,
      price: this.props.price,
      orderId: this.props.orderId,
      numberOfDays: this.props.numberOfDays,
      cashPayment: this.props.cashPayment
      // bodyText: "Thank you for choosing Bengkala as your holiday getaway",
      // subject: "Trip Confirmation"
    });

  }

  render() {
    return (
      <div>
        <p>Thank you!</p>
        <p>A confirmation email with the invoice attached has been sent to {this.props.personalDetails.email}</p>
      </div>
    );
  }
}

export default ConfirmationScreen
