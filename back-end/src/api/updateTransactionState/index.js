import db from '../../storage/db';
import { TABLE_INFORMATION, TABLE_TRANSACTIONS } from '../../storage/tableName';
import calculations from '../../middleware/calculations';

import { serverKey, clientKey } from '../../secret/midtransSecret';
import sendEmail from '../../utils/emailSender/emailSender'
import { refractorOrder, constructStringDate } from '../../utils/helperMethods'

const midtransClient = require('midtrans-client');

const apiClient = new midtransClient.Snap({
    isProduction: false,
    serverKey,
    clientKey
});

const updateDB = async (orderID, paymentStat) => {
    await db.updateData(TABLE_TRANSACTIONS, { cash: paymentStat }, { uuid: orderID });
};


const updateState = [
    async (req, res) => {
        const transactionID = req.body.data.uuid;
        console.log('Transaction!!!', transactionID);

        const UUIDexists = await db.uuidExist(TABLE_TRANSACTIONS, transactionID);

        if (UUIDexists) {
            try {
                const response = await apiClient.transaction.status(transactionID);

                if (response.fraud_status === 'accept') {
                    const services = await db.fetchData(TABLE_INFORMATION, { type: 'cost' });
                    console.log('SERVICES', services);

                    const Order = await db.fetchData(TABLE_TRANSACTIONS, { uuid: transactionID });
                    const myOrder = Order[0];
                    console.log('myOrder', myOrder);

                    const CalculationData = new Object();

                    CalculationData.tripDetails = { ...refractorOrder(myOrder) };

                    CalculationData.cost = new Object();

                    services.forEach((item) => {
                        const price = parseInt(item.pricesString, 10);
                        CalculationData.cost[item.title.toLowerCase()] = price;
                    });

                    console.log('CalculationData.cost', CalculationData.cost);
                    const { prices, numberOfDays } = calculations(CalculationData);
                    console.log({ prices, numberOfDays });
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
