/* eslint-disable camelcase */
/* eslint-disable quote-props */
import midtransClient from 'midtrans-client';

// promised based snap tokenisation
// refer to "backend integration" in  https://snap-docs.midtrans.com/#endpoint
// const snapTokenPost = [
//   async (req, res) => {
//     console.log('Making a token request');
//     // let snapRes;
//     const axiosConfig = {
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': `Basic ${base64.encode('SB-Mid-server-Mix8cvIyBndvfoY_5kaHtiGD:')}`,
//       }
//     };
//     // preparing Snap API parameter ( refer to: https://snap-docs.midtrans.com ) minimum parameter example:
//     const parameters = {
//       'transaction_details': {
//         'order_id': 'ORDER-TEST-123',
//         'gross_amount': 10000 // req.body.data.gross_amount
//       },
//       'credit_card': {
//         'secure': true
//       },
//       /*
//       'customer_details': {
//         'frist_name': req.body.data.first_name,
//         'last_name': req.body.data.last_name,
//         'email': req.body.data.email,
//       }
//       */
//     };
//     /*
//       send the transaction data to the database here!
//       const transaction = {
//           order_id: parameters.transaction_details.order_id
//           amount:
//           status: pending // change to success/failure based on response from the backend
//       }
//     */

//     // try {
//     const snapRes = await axios.post('https://app.sandbox.midtrans.com/snap/v1/transactions', qs.stringify(parameters), axiosConfig);
//     // } catch (error) {
//     // console.log(error);
//     // }
//     res.json({
//       data: snapRes, // send token or error message to the front end
//     });
//   },
// ];

const snapTokenPost = [
  async (req, res) => {
    console.log('retrieving snap token');
    // get data from front-end
    // eslint-disable-next-line object-curly-newline
    const { first_name, last_name, email, gross_amount } = req.body.data;
    // Create Snap API instance
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: '',
      clientKey: ''
    });

    const parameter = {
      'transaction_details': {
        'order_id': 'test-transaction-123',
        'gross_amount': gross_amount
      },
      'credit_card': {
        'secure': true
      },
      'customer_details': {
        'first_name': first_name,
        'last_name': last_name,
        'email': email,
      }
    };

    const snapToken = await snap.createTransactionToken(parameter);

    res.json({
      data: snapToken,
    });
  }
];

export default {
  post: snapTokenPost,
};
