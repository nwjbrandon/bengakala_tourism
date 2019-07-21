import db from '../../storage/db';
import { TABLE_INFORMATION, TABLE_TRANSACTIONS } from '../../storage/tableName';
import calculations from '../../middleware/calculations';
import { clientKey, serverKey } from '../../secret/midtransSecret';
import sendEmail from '../../utils/emailSender/emailSender';
import { constructStringDate, refractorOrder } from '../../utils/helperMethods';

const midtransClient = require('midtrans-client');

const apiClient = new midtransClient.Snap({
    isProduction: false,
    serverKey,
    clientKey
});

const updateDB = async (orderID, paymentStat) => {
    await db.updateData(TABLE_TRANSACTIONS, { cash: paymentStat }, { uuid: orderID });
};

//Manual Updating of Database with transaction state changes after updating midtrans dashboard
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
                        CalculationData.cost[item.title.toLowerCase()] = parseInt(item.pricesString, 10);
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
