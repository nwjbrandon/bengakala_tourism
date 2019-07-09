import _ from 'lodash';
import uuidv1 from 'uuid/v1';
import db from '../../storage/db';
import { TABLE_INFORMATION, TABLE_TRANSACTIONS } from '../../storage/tableName';

const bookingInfo = [
  async (req, res) => {
    const services = await db.fetchData(TABLE_INFORMATION, { type: 'cost' });
    const cost = _.map(services, service => ({ [service.title]: service.pricesString }));
    res.json({
      data: {
        cost,
        excludedDates: [],
      }
    });
  },
];

const bookingPost = [
  async (req, res) => {
    const paymentData = req.body.data;
    const uuid = uuidv1();
    const confirmedData = _.assign({
      uuid,
      ...paymentData,
    });
    await db.saveData(TABLE_TRANSACTIONS, confirmedData);
    res.json({
      data: 'success',
    });
  }
];
export default {
  info: bookingInfo,
  post: bookingPost
};
