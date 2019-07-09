import React from 'react'
import Calendar from 'react-calendar';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import ReactTooltip from 'react-tooltip';
import API from '../../api'



class ConfirmationScreen extends React.Component {

  constructor(props) {
    super(props)

    this.callSnap = this.callSnap.bind(this)
    this.handleTokenReq = this.handleTokenReq.bind(this)
    this.getToken = this.getToken.bind(this)
  }

  state = {
    date: new Date(),
  }

  componentDidMount() {
    { this.callSnap() }
  }

  onChange = date => this.setState({ date })

  /* Includes a callback to show snap loading, success, etc screens */
  callSnap = () => {
    snap.show(); // the snap loading screen
    this.handleTokenReq((error, snapToken) => {
      if (error) {
        snap.hide();
        console.log(error)
      } else {
        console.log('calling snap pay')
        snap.pay(snapToken, {
          onSuccess: (result) => { console.log('success'); console.log(result); alert('Payment Success') },
          onPending: (result) => { console.log('pending'); console.log(result); alert('Payment Pending') },
          onError: (result) => { console.log('error'); console.log(result); alert('Payment Error') },
          onClose: () => {
            console.log('customer closed the popup without finishing the payment');
            alert('Please do not close the payment pop-up')
          }
        })
      }
    })
  }

  handleTokenReq = (callback) => {
    console.log('handling token request')
    const snapToken = this.getToken();
    if (snapToken) {
      callback(null, snapToken)
    } else {
      callback(new Error('Unable to process payment, please try again later'), null)
    }
  }

  // get the token (or error) from the back-end
  getToken = () => {
    const { personalDetails, grossAmount } = this.props
    console.log('getting token from backend')
    API.post('/snap/info', {
      data: {
        'first_name': personalDetails.firstName,
        'last_name': personalDetails.lastName,
        'email': personalDetails.email,
        'gross_amount': grossAmount,
      }
    }).then((res) => {
      console.log(res);
      return res.snapToken;
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        <p>Thank you!</p>
        <p>A confirmation email with the invoice attached has been sent to {this.props.email}
          please make cash payment of {this.props.grossAmount}IDR upon arrival at our village.
          </p>
      </div>
    );
  }
}

export default ConfirmationScreen
