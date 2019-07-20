import midtransClient from 'midtrans-client';
import { serverKey, clientKey } from '../../secret/midtransSecret';
import { wrapAsync } from '../../middleware/errorHandling';
import db from '../../storage/db';
import { refractorOrder, constructStringDate } from '../../utils/helperMethods'

import calculations from '../../middleware/calculations'
import { TABLE_TRANSACTIONS } from '../../storage/tableName';

// getTransactionStatus();
const updateDB = async (orderID, paymentStat) => {
  await db.updateData(TABLE_TRANSACTIONS, { cash: paymentStat }, { uuid: orderID });
};


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
    const transactionId = statusResponse.transaction_id;


    const UUIDexists = await db.uuidExist(TABLE_TRANSACTIONS, transactionId);


    if (UUIDexists) {
      if (transactionStatus === 'capture') {
        if (fraudStatus === 'challenge') {
          // TODO set transaction status on database to 'challenge'
          await updateDB(transactionId, 1);
        } else if (fraudStatus === 'accept') {
          const services = await db.fetchData(TABLE_INFORMATION, { type: 'cost' });
          const Order = await db.fetchData(TABLE_TRANSACTIONS, { uuid: transactionId });
          const myOrder = Order[0];
          const CalculationData = new Object();

          CalculationData.tripDetails = { ...refractorOrder(myOrder) }

          CalculationData.cost = new Object();

          services.forEach((item) => {
            const price = parseInt(item.pricesString, 10);
            CalculationData.cost[item.title.toLowerCase()] = price;
          })

          const { prices, numberOfDays } = calculations(CalculationData);
          const EmailData = {
            tripDetails: CalculationData.tripDetails,
            cost: CalculationData.cost,
            prices: prices,
            numberOfDays: numberOfDays,
            orderStatus: myOrder.cash,
            transactionID: myOrder.uuid,
            toEmail: myOrder.email,
            checkIn: constructStringDate(CalculationData.tripDetails.checkIn),
            checkOut: constructStringDate(CalculationData.tripDetails.checkOut),
            Now: constructStringDate(),
          }

          await sendEmail(EmailData);

          await updateDB(transactionId, 2);
        }
      } else if (transactionStatus === 'cancel'
        || transactionStatus === 'deny'
        || transactionStatus === 'expire') {
        // do nothing
      } else if (transactionStatus === 'pending') {
        await updateDB(transactionId, 1);
        // TODO set transaction status on your database to 'pending' / waiting payment
      }
    }
    return res.json({ data: 'success' });
  })
];
export default {
  post: notificationPost
};
