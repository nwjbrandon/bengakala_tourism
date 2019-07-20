import db from '../../storage/db';
import { TABLE_INFORMATION, TABLE_TRANSACTIONS } from '../../storage/tableName';
import calculations from '../../middleware/calculations';
import { clientKey, serverKey } from '../../secret/midtransSecret';
import sendEmail from '../../utils/emailSender/emailSender';

const midtransClient = require('midtrans-client');

const apiClient = new midtransClient.Snap({
  isProduction: false,
  serverKey,
  clientKey
});

const updateDB = async (orderID, paymentStat) => {
  await db.updateData(TABLE_TRANSACTIONS, { cash: paymentStat }, { uuid: orderID });
};

const constructStringDate = (date) => {
  const DateObj = date ? new Date(date) : new Date();
  return `${DateObj.getFullYear()}-${DateObj.getMonth() + 1}-${DateObj.getDate()}`;
};


const refractorOrder = myOrder => ({

  firstName: myOrder.firstName,
  lastName: myOrder.lastName,
  email: myOrder.email,
  country: myOrder.country,


  checkIn: myOrder.dateFrom,
  checkOut: myOrder.dateTo,
  breakfast: myOrder.breakfast,
  lunch: myOrder.lunch,
  dinner: myOrder.dinner,
  numberMales: parseInt(myOrder.males, 10),
  numberFemales: parseInt(myOrder.females, 10),
  numberVans: parseInt(myOrder.van, 10),
  numberCars: parseInt(myOrder.cars, 10),
  numberBikes: parseInt(myOrder.motorbikes, 10),

  transactionID: myOrder.uuid
});

const updateState = [
  async (req, res) => {
    const transactionID = req.body.data.uuid;

    const UUIDexists = await db.uuidExist(TABLE_TRANSACTIONS, transactionID);

    if (UUIDexists) {
      try {
        const response = await apiClient.transaction.status(transactionID);

        if (response.fraud_status === 'accept') {
          const services = await db.fetchData(TABLE_INFORMATION, { type: 'cost' });

          const Order = await db.fetchData(TABLE_TRANSACTIONS, { uuid: transactionID });
          const myOrder = Order[0];

          const CalculationData = new Object();

          CalculationData.tripDetails = { ...refractorOrder(myOrder) };

          CalculationData.cost = new Object();

          services.forEach((item) => {
            const price = parseInt(item.pricesString, 10);
            CalculationData.cost[item.title.toLowerCase()] = price;
          });

          const { prices, numberOfDays } = calculations(CalculationData);
          const EmailData = {
            tripDetails: CalculationData.tripDetails,
            cost: CalculationData.cost,
            prices,
            numberOfDays,
            orderStatus: myOrder.cash,
            transactionID: myOrder.uuid,
            toEmail: myOrder.email,
            checkIn: constructStringDate(CalculationData.tripDetails.checkIn),
            checkOut: constructStringDate(CalculationData.tripDetails.checkOut),
            Now: constructStringDate(),
          };

          await sendEmail(EmailData);
          await updateDB(transactionID, 2);
        }
      } catch (err) {
        console.log(err);
      }

      res.json({
        data: 'success',
      });
    } else {
      res.json({
        data: 'not found',
      });
    }
  }
];
export default {
  update: updateState
};
