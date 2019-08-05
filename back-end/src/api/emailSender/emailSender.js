import _ from 'lodash';
import sendEmail from '../../utils/emailSender/emailSender';
import db from '../../storage/db';
import { TABLE_TRANSACTIONS } from '../../storage/tableName';
import { clientKey, serverKey } from '../../secret/midtransSecret';

const midtransClient = require('midtrans-client');

const constructStringDate = (date) => {
  const DateObj = date ? new Date(date) : new Date();
  return `${DateObj.getFullYear()}-${DateObj.getMonth() + 1}-${DateObj.getDate()}`;
};

const apiClient = new midtransClient.Snap({
  isProduction: false,
  serverKey,
  clientKey
});

// const formatter = new Intl.NumberFormat('en-IDR', {
//   style: 'currency',
//   currency: 'IDR',
//   currencyDisplay: "symbol",
//   minimumFractionDigits: 0,
// })

const formatter = new Intl.NumberFormat({
  style: 'decimal',
  minimumFractionDigits: 0,
})

const formatAll = (emailData) => {
  // const formattedData = Object.keys(emailData).reduce((result, key) => {
  //   result[key] = formatter.format(emailData[result])
  //   return result;
  // }, {});
  // console.log(formattedData)
  // return formattedData;


  const objectMap = (object, mapFn) => {
    return Object.keys(object).reduce((result, key) => {
      result[key] = mapFn(object[key])
      return result
    }, {})
  }

  const newObject = objectMap(emailData, function (value) {
    return formatter.format(value);
  })

  console.log(emailData)
  console.log(newObject)

  return newObject;

}

const writeToDB = async (Data, paymentStat) => {
  const paymentData = {
    uuid: Data.transactionID,
    firstName: Data.personalDetails.firstName,
    lastName: Data.personalDetails.lastName,
    email: Data.personalDetails.email,
    country: Data.personalDetails.country,
    dateFrom: constructStringDate(Data.tripDetails.checkIn),
    dateTo: constructStringDate(Data.tripDetails.checkOut),
    males: Data.tripDetails.numberMales,
    females: Data.tripDetails.numberFemales,
    cars: Data.tripDetails.numberCars,
    van: Data.tripDetails.numberVans,
    breakfast: (Data.tripDetails.breakfast),
    lunch: (Data.tripDetails.lunch),
    dinner: (Data.tripDetails.dinner),
    motorbikes: Data.tripDetails.numberBikes,
    createdAt: constructStringDate(),
    checkedIn: false,
    cash: paymentStat,
    carsAirport: Data.tripDetails.numberAirportCars,
    airportLocation:Data.tripDetails.pickUpDetails
  };
  const confirmedData = _.assign({
    ...paymentData,
  });
  await db.saveData(TABLE_TRANSACTIONS, confirmedData);
};


//Handles post request upon payment completion
//Updates Database with user and trip details
//Sends email if successful payment
const send = [
  async (req, res) => {
    const Data = req.body;

    const { transactionID } = Data;
    const orderStat = Data.orderStatus;

    const UUIDexists = await db.uuidExist(TABLE_TRANSACTIONS, transactionID);

    if (!UUIDexists) {
      if (orderStat === 0) {
        await writeToDB(Data, 0);
        await sendEmail({
          toEmail: Data.personalDetails.email,
          tripDetails: { ...Data.personalDetails, ...Data.tripDetails },
          cost: formatAll(Data.cost),
          prices: formatAll(Data.prices),
          numberOfDays: Data.numberOfDays,
          transactionID: Data.transactionID,
          orderStatus: Data.orderStatus,
          checkIn: constructStringDate(Data.tripDetails.checkIn),
          checkOut: constructStringDate(Data.tripDetails.checkOut),
          Now: constructStringDate(),
        });

        res.json({
          data: 'success',
        });
      } else if (orderStat === 1) {
        try {
          const response = await apiClient.transaction.status(transactionID);

          if (response.fraud_status === 'accept') {
            await sendEmail({
              toEmail: Data.personalDetails.email,
              tripDetails: { ...Data.personalDetails, ...Data.tripDetails },
              cost: formatAll(Data.cost),
              prices: formatAll(Data.prices),
              numberOfDays: Data.numberOfDays,
              transactionID: Data.transactionID,
              orderStatus: Data.orderStatus,
              checkIn: constructStringDate(Data.tripDetails.checkIn),
              checkOut: constructStringDate(Data.tripDetails.checkOut),
              Now: constructStringDate(),
            });
            await writeToDB(Data, 2);
            res.json({
              data: 'success',
            });
          } else {
            res.json({
              data: 'pending',
            });
            await writeToDB(Data, 1);
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        res.json({
          data: 'success',
        });
      }
    }
  }
];
export default {
  send
};
