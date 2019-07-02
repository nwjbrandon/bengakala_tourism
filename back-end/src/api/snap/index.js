/* eslint-disable quote-props */
import axios from 'axios';
import base64 from 'base-64';

// promised based snap tokenisation
// refer to "backend integration" in  https://snap-docs.midtrans.com/#endpoint
const snapTokenPost = [
  async (req, res) => {
    console.log('Making a token request');
    let snapRes;
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': base64.encode('server key :'),
      }
    };
    // preparing Snap API parameter ( refer to: https://snap-docs.midtrans.com ) minimum parameter example:
    const parameters = {
      'transaction_details': {
        'order_id': Math.round((new Date()).getTime() / 1000),
        'gross_amount': req.body.data.gross_amount
      },
      'credit_card': {
        'secure': true
      },
      'customer_details': {
        'frist_name': req.body.data.first_name,
        'last_name': req.body.data.last_name,
        'email': req.body.data.email,
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
      console.log(error);
    }
    res.json({
      data: snapRes, // send token or error message to the front end
    });
  },
];

export default {
  post: snapTokenPost,
};
