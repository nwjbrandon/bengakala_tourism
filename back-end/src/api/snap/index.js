import axios from 'axios';
// initialize snap client object

// preparing Snap API parameter ( refer to: https://snap-docs.midtrans.com ) minimum parameter example:
/*
// Going to wrap the params in the front end so as to make it easier to add data i may need
// sample data below
const parameter = {
  transaction_details: {
    order_id: 'test-transaction-123',
    gross_amount: 200000
  },
  credit_card: {?par
    secure: true
  }
};
*/

// promised based snap tokenisation
const snapTokenPost = [
  async (req, res) => {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-type': 'applications/json',
        Authorization: Base64('My_SERVER_key + ""'),
      }
    };
    const parameters = req.body.data; // the transaction details from front-end
    const token = await axios.post('https://app.sandbox.midtrans.com/snap/v1/transactionsparameters', parameters, config)
    // the promise above may give errors, how to handle them within async?
    res.json({
      data: token,
    });
  },
];

export default {
  post: snapTokenPost,
};
