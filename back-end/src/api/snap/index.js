/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
import midtransClient from 'midtrans-client';
import uuid from 'uuid/v1';
import { serverKey, clientKey } from '../../secret/midtransSecret';
import {wrapAsync} from "../../middleware/errorHandling";

const snapTokenPost = [
  wrapAsync(async (req, res) => {
    const {
      // eslint-disable-next-line camelcase
      first_name, last_name, email, gross_amount
    } = req.body;
    // Create Snap API instance
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey,
      clientKey
    });
    // eslint-disable-next-line camelcase
    const order_id = uuid();
    const parameter = {
      transaction_details: {
        order_id: uuid(),
        gross_amount
      },
      credit_card: {
        secure: true
      },
      customer_details: {
        first_name,
        last_name,
        email,
      },
    };
    const snapToken = await snap.createTransactionToken(parameter);
    res.json({
      data: {
        snapToken,
        order_id
      },
    });
  })
];

export default {
  post: snapTokenPost,
};
