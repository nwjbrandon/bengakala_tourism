import React from 'react'
import 'react-calendar-heatmap/dist/styles.css';
import API from '../../api'
import CryptoJS from 'crypto-js'

class ConfirmationScreen extends React.Component {

  componentDidMount() {

    const emailMsgObj = {
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
    };

    const emailMsg = JSON.stringify(emailMsgObj);

    // const unencryptedMsg = SHA256(emailMsg);

    const cipher = CryptoJS.AES.encrypt(emailMsg, "FRONT_END_PUBLIC_KEY")

    const emailMsgToBeSent = { msg: emailMsgObj, encrypt: cipher }

    API.post('/sendEmail', emailMsgToBeSent);

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
