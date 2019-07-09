import React from 'react'
import 'react-calendar-heatmap/dist/styles.css';
import API from '../../api'


class ConfirmationScreen extends React.Component {

  componentDidMount() {

    API.post('/sendEmail', {
      toEmail: this.props.personalDetails.email,
      personalDetails: { ...this.props.personalDetails },
      tripDetails: { ...this.props.tripDetails },
      grossAmount: this.props.grossAmount,
      bodyText: "Thank you for choosing Bengkala as your holiday getaway",
      subject: "Trip Confirmation"
    });

  }

  render() {
    return (
      <div>
        <p>Thank you!</p>
        <p>A confirmation email with the invoice attached has been sent to {this.props.personalDetails.email}
          please make cash payment of {this.props.grossAmount}IDR upon arrival at our village.
          </p>
      </div>
    );
  }
}

export default ConfirmationScreen
