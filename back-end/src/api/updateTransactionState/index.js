import db from '../../storage/db';
import { TABLE_EXCLUDED_DATES, TABLE_INFORMATION, TABLE_TRANSACTIONS } from '../../storage/tableName';
import { eachDay } from 'date-fns';
import calculations from '../../middleware/calculations'

import { serverKey, clientKey } from '../../secret/midtransSecret';
import sendEmail from '../../utils/emailSender/emailSender'

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

        const transactionID = req.body.data.uuid;
        console.log("Transaction!!!", transactionID);

        const UUIDexists = await db.uuidExist(TABLE_TRANSACTIONS, transactionID);

        if (UUIDexists) {
            try {
                const response = await apiClient.transaction.status(transactionID);

                if (response.fraud_status === 'accept') {

                    const services = await db.fetchData(TABLE_INFORMATION, { type: 'cost' });
                    console.log("SERVICES", services);

                    const Order = await db.fetchData(TABLE_TRANSACTIONS, { uuid: transactionID });
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
                    await updateDB(transactionID, 2)
                }

            } catch (err) {
                console.log(err)
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
