import midtransClient from 'midtrans-client';
import { serverKey, clientKey } from '../../secret/midtransSecret';
import { wrapAsync } from '../../middleware/errorHandling';

// const getTransactionStatus = wrapAsync(async (req, res) => {
//   // Create Core API / Snap instance (both have shared `transactions` methods)
//   const apiClient = new midtransClient.Snap({
//     isProduction: false,
//     serverKey,
//     clientKey
//   });

//   const notificationJson = req.body;

//   const statusResponse = await apiClient.transaction.notification(notificationJson);
//   const orderId = statusResponse.order_id;
//   const transactionStatus = statusResponse.transaction_status;
//   const fraudStatus = statusResponse.fraud_status;

//   console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);


//   if (transactionStatus === 'capture') {
//     if (fraudStatus === 'challenge') {
//       // TODO set transaction status on databaase to 'challenge'
//     } else if (fraudStatus === 'accept') {
//       // TODO set transaction status on databaase to 'success' and send email here
//     }
//   } else if (transactionStatus === 'cancel'
//     || transactionStatus === 'deny'
//     || transactionStatus === 'expire') {
//     // do nothing
//   } else if (transactionStatus === 'pending') {
//     // TODO set transaction status on your databaase to 'pending' / waiting payment
//   }
// });




// getTransactionStatus();


const notificationPost = [
  wrapAsync(async (req, res) => {
    // Create Core API / Snap instance (both have shared `transactions` methods)
    const apiClient = new midtransClient.Snap({
      isProduction: false,
      serverKey,
      clientKey
    });

    const notificationJson = req.body;

    const statusResponse = await apiClient.transaction.notification(notificationJson);
    const orderId = statusResponse.order_id;
    const transactionStatus = statusResponse.transaction_status;
    const fraudStatus = statusResponse.fraud_status;

    console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);


    if (transactionStatus === 'capture') {
      if (fraudStatus === 'challenge') {
        // TODO set transaction status on databaase to 'challenge'

      } else if (fraudStatus === 'accept') {
        // TODO set transaction status on databaase to 'success' and send email here
      }
    } else if (transactionStatus === 'cancel'
      || transactionStatus === 'deny'
      || transactionStatus === 'expire') {
      // do nothing
    } else if (transactionStatus === 'pending') {
      // TODO set transaction status on your databaase to 'pending' / waiting payment
    }
  })

];
export default {
  post: notificationPost
};