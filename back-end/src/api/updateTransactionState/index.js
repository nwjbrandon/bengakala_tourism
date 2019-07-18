import sendEmail from '../../emailSender/emailSender'
import { FRONT_END_PRIVATE_KEY } from '../../secret/encryption'
import SHA256 from 'crypto-js/sha256'
import CryptoJS from 'crypto-js'

import _ from 'lodash';
import { wrapAsync } from "../../middleware/errorHandling";
import db from '../../storage/db';
import { TABLE_EXCLUDED_DATES, TABLE_INFORMATION, TABLE_TRANSACTIONS } from '../../storage/tableName';
import { eachDay } from 'date-fns';
import calculations from '../../middleware/calculations'

import { serverKey, clientKey } from '../../secret/midtransSecret';

const midtransClient = require('midtrans-client');

const apiClient = new midtransClient.Snap({
    isProduction: false,
    serverKey: serverKey,
    clientKey: clientKey
});

const updateDB = async (orderID, paymentStat) => {

    await db.updateData(TABLE_TRANSACTIONS, { cash: paymentStat }, { uuid: orderID });

}

const constructStringDate = (date) => {
    const DateObj = date ? new Date(date) : new Date();
    const str = `${DateObj.getFullYear()}-${DateObj.getMonth() + 1}-${DateObj.getDate()}`
    console.log(str)
    return str
}


const refractorOrder = (myOrder) => {

    const refractoredOrder = {

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
    }

    return refractoredOrder
}

const updateState = [
    async (req, res) => {

        const orderID = req.body.data.uuid;
        console.log("ORDER!!!", orderID);


        // cost: {
        //     accommodation: 100000,
        //     van: 50000,
        //     car: 50000,
        //     bike: 50000,
        //     breakfast: 20000,
        //     lunch: 20000,
        //     dinner: 20000
        //   },

        // API.post('/sendEmail', {
        //     toEmail: props.personalDetails.email,
        //     personalDetails: props.personalDetails,
        //     tripDetails: props.tripDetails,
        //     cost: props.cost,
        //     price: props.price,
        //     orderId: orderID,
        //     transactionID: tokenID,
        //     numberOfDays: props.numberOfDays,
        //     orderStatus: cashOrNot

        //   })

        try {
            const response = await apiClient.transaction.status(orderID);

            if (response.fraud_status === 'accept') {

                const services = await db.fetchData(TABLE_INFORMATION, { type: 'cost' });
                console.log("SERVICES", services);

                const Order = await db.fetchData(TABLE_TRANSACTIONS, { uuid: orderID });
                const myOrder = Order[0];
                console.log("myOrder", myOrder);

                const CalculationData = new Object();

                CalculationData.tripDetails = { ...refractorOrder(myOrder) }

                CalculationData.cost = new Object();

                services.forEach((item) => {
                    const price = parseInt(item.pricesString, 10);
                    CalculationData.cost[item.title.toLowerCase()] = price;
                })

                console.log("CalculationData.cost", CalculationData.cost)
                const { prices, numberOfDays } = calculations(CalculationData);
                console.log({ prices, numberOfDays })
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
                await updateDB(orderID, 2)
            }

        } catch (err) {
            console.log(err)
        }

        res.json({
            data: 'success',
        });
    }
];
export default {
    update: updateState
};
