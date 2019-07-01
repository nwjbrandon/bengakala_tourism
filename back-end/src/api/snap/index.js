/* eslint-disable quote-props */
import axios from 'axios';
import base64 from 'base-64';

// promised based snap tokenisation
// refer to "backend integration" in  https://snap-docs.midtrans.com/#endpoint
const snapTokenPost = [
  async (req, res) => {
    let snapRes;
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': base64.encode('My_SERVER_key + ""'),
      }
    };
    // preparing Snap API parameter ( refer to: https://snap-docs.midtrans.com ) minimum parameter example:
    const parameters = {
      'transaction_details': {
        'order_id': Math.round((new Date()).getTime() / 1000),
        'gross_amount': req.body.totalCost
      },
      'credit_card': {
        'secure': true
      },
      'customer_details': {
        'frist_name': req.body.frist_name,
        'last_name': req.body.last_name,
        'email': req.body.email,
      }
    };
    /*
      send the transaction data to the database here here!
      const transaction = {
          order_id: parameters.transaction_details.order_id
          amount: 
          status: pending // change to success/failure based on response from the backend
      }
    */

    try {
      snapRes = await axios.post('https://app.sandbox.midtrans.com/snap/v1/transactionsparameters', parameters, config);
    } catch (error) {
      // log the error response (stored in an array hence map is used)
      error.map(e => console.log(e));
    }
    res.json({
      data: snapRes.token, // only send the token to the front
    });
  },
];

export default {
  post: snapTokenPost,
};
