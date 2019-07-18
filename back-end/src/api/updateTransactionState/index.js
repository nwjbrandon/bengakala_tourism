import sendEmail from '../../emailSender/emailSender'
import { FRONT_END_PRIVATE_KEY } from '../../secret/encryption'
import SHA256 from 'crypto-js/sha256'
import CryptoJS from 'crypto-js'

import _ from 'lodash';
import { wrapAsync } from "../../middleware/errorHandling";
import db from '../../storage/db';
import { TABLE_EXCLUDED_DATES, TABLE_INFORMATION, TABLE_TRANSACTIONS } from '../../storage/tableName';
import { eachDay } from 'date-fns';


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

const updateState = [
    async (req, res) => {

        const orderID = req.body.data.uuid;
        console.log("ORDER!!!", orderID)

        try {
            const response = await apiClient.transaction.status(orderID);

            if (response.fraud_status === 'accept') {
                // await sendEmail(Data);
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
