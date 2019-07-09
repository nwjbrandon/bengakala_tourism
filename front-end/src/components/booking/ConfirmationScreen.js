import React from 'react';
import 'react-calendar-heatmap/dist/styles.css';
import API from '../../api';

class ConfirmationScreen extends React.Component {

  constructor(props) {
    super(props);
    this.callSnap = this.callSnap.bind(this);
    this.getToken = this.getToken.bind(this);
  }
  state = {
    date: new Date(),
  };

  callSnap = async () => {
    const snap = window.snap;
    snap.show();
    console.log('handling token request like a boss');
    const snapToken = await this.getToken();
    console.log("snaptoken", snapToken);
    if (snapToken) {
      console.log('calling snap pay');
      snap.pay(snapToken, {
        onSuccess: (result) => { console.log('success'); console.log(result); alert('Payment Success') },
        onPending: (result) => { console.log('pending'); console.log(result); alert('Payment Pending') },
        onError: (result) => { console.log('error'); console.log(result); alert('Payment Error') },
        onClose: () => {
          console.log('customer closed the popup without finishing the payment');
          alert('Please do not close the payment pop-up')
        }
      })

    } else {
      snap.hide();
    }
  };

  componentDidMount() {
    this.callSnap()
  }

  onChange = date => this.setState({ date });

  // get the token (or error) from the back-end
  getToken = async () => {
    const { personalDetails, grossAmount } = this.props;
    console.log('getting token from backend');
    const res = await API.post('/snap/info', {
      'first_name': personalDetails.firstName,
      'last_name': personalDetails.lastName,
      'email': personalDetails.email,
      'gross_amount': grossAmount,

    });
    const { snapToken } = res.data;
    if (snapToken) {
      console.log(snapToken);
      return snapToken;
    } else {
      return null;
    }
  };

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
