import React from 'react'
import 'react-calendar-heatmap/dist/styles.css';
import API from '../../api'
import CryptoJS from 'crypto-js'

class ConfirmationScreen extends React.Component {

  render() {
    return (
      <div>
        <h3 style={{ color: "white", fontSize: "2em" }}>Thank you for choosing us !</h3>
        <h4 style={{ color: "white", fontSize: "1.5em" }}>The Confirmation email has been sent to {this.props.email}<br /> We look forward to Seeing you!!</h4>
      </div>
    );
  }
}

export default ConfirmationScreen
