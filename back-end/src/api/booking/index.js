import _ from 'lodash';
import uuidv1 from 'uuid/v1';
import { wrapAsync } from "../../middleware/errorHandling";
import db from '../../storage/db';
import {TABLE_EXCLUDED_DATES, TABLE_INFORMATION, TABLE_TRANSACTIONS} from '../../storage/tableName';

const bookingInfo = [
  wrapAsync(async (req, res) => {
    const services = await db.fetchData(TABLE_INFORMATION, { type: 'cost' });
    const cost = _.map(services, service => ({ [service.title]: service.pricesString }));
    const excludedDatesData = await db.fetchData(TABLE_EXCLUDED_DATES);
    const excludedDates = _.map(excludedDatesData, (data) => data.date);
    res.json({
      data: {
        cost,
        excludedDates,
      }
    });
  }),
];

const bookingPost = [
  wrapAsync(async (req, res) => {
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
  })
];
export default {
  info: bookingInfo,
  post: bookingPost
};
