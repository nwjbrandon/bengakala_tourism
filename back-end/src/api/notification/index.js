import midtransClient from 'midtrans-client';
import { serverKey, clientKey } from '../../secret/midtransSecret';
import { wrapAsync } from '../../middleware/errorHandling';


// getTransactionStatus();
const updateDB = async (orderID, paymentStat) => {

  await db.updateData(TABLE_TRANSACTIONS, { cash: paymentStat }, { uuid: orderID });

}


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
    const transactionId = statusResponse.transaction_id

    console.log(`Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`);

    const UUIDexists = await db.uuidExist(TABLE_TRANSACTIONS, transactionId);

    const Data = await fetchData(TABLE_TRANSACTIONS, { uuid: transactionId })

    console.log(Data)

    if (UUIDexists) {

      if (transactionStatus === 'capture') {
        if (fraudStatus === 'challenge') {
          // TODO set transaction status on databaase to 'challenge'
          updateDB(transactionId, 1);
        } else if (fraudStatus === 'accept') {
          updateDB(transactionId, 2);
          // TODO set transaction status on databaase to 'success' and send email here
        }
      } else if (transactionStatus === 'cancel'
        || transactionStatus === 'deny'
        || transactionStatus === 'expire') {
        // do nothing
      } else if (transactionStatus === 'pending') {
        updateDB(transactionId, 1);
        // TODO set transaction status on your databaase to 'pending' / waiting payment
      }

    }

  })

];
export default {
  post: notificationPost
};