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

const constructStringDate = (date) => {
    const DateObj = date ? new Date(date) : new Date();
    const str = `${DateObj.getFullYear()}-${DateObj.getMonth() + 1}-${DateObj.getDate()}`
    console.log(str)
    return str
}

const apiClient = new midtransClient.Snap({
    isProduction: false,
    serverKey: serverKey,
    clientKey: clientKey
});

const writeToDB = async (Data, paymentStat) => {

    const paymentData = {
        "uuid": Data.snapToken,
        "firstName": Data.personalDetails.firstName,
        "lastName": Data.personalDetails.lastName,
        "email": Data.personalDetails.email,
        "country": Data.personalDetails.country,
        "dateFrom": constructStringDate(Data.tripDetails.checkIn),
        "dateTo": constructStringDate(Data.tripDetails.checkOut),
        "males": Data.tripDetails.numberMales,
        "females": Data.tripDetails.numberFemales,
        "cars": Data.tripDetails.numberCars,
        "van": Data.tripDetails.numberVans,
        "breakfast": (Data.tripDetails.breakfast),
        "lunch": (Data.tripDetails.lunch),
        "dinner": (Data.tripDetails.dinner),
        "motorbikes": Data.tripDetails.numberBikes,
        "createdAt": constructStringDate(),
        "checkedIn": false,
        "cash": paymentStat
    };
    const confirmedData = _.assign({
        ...paymentData,
    });
    await db.saveData(TABLE_TRANSACTIONS, confirmedData);

}

const send = [
    async (req, res) => {

        const Data = req.body;
        console.log(Data)

        const snapToken = Data.snapToken;
        const orderId = Data.orderId;
        const orderStat = Data.orderStatus
        console.log(orderStat)
        console.log(db.uuidExist(TABLE_TRANSACTIONS, snapToken))

        // if (!db.uuidExist(TABLE_TRANSACTIONS, snapToken)) {


        if (orderStat === 0) {
            await writeToDB(Data, 0)
        } else if (orderStat === 1) {
            try {
                const response = await apiClient.transaction.status(snapToken);

                console.log("RESPONSE", response)

                if (response.fraud_status === 'accept') {
                    await sendEmail(Data);
                    await writeToDB(Data, 2)
                } else {
                    await writeToDB(Data, 1)
                }


            } catch (err) {
                console.log(err)
            }


        } else {
            //
        }


        // }





        //     toEmail: Data.personalDetails.email,
        //   personalDetails: props.personalDetails,
        //   tripDetails: props.tripDetails,
        //   cost: props.cost,
        //   price: props.price,
        //   orderId: orderID,
        //   snapToken: tokenID,
        //   numberOfDays: props.numberOfDays,
        //   orderStatus: cashOrNot



        // const emailData = req.body;
        // const msg = emailData.msg;
        // const encrypt = emailData.encrypt;

        // var bytes  = CryptoJS.AES.decrypt(encrypt.toString(), FRONT_END_PRIVATE_KEY);
        // var plaintext = bytes.toString(CryptoJS.enc.Utf8);


        // await sendEmail(emailData);
        res.json({
            data: 'success',
        });
    }
];
export default {
    send: send
};
