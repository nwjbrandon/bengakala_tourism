import _ from 'lodash';
import { wrapAsync } from "../../middleware/errorHandling";
import db from '../../storage/db';
import { TABLE_EXCLUDED_DATES, TABLE_INFORMATION, TABLE_TRANSACTIONS } from '../../storage/tableName';
import { eachDay } from 'date-fns';

const bookingInfo = [
  wrapAsync(async (req, res) => {
    const services = await db.fetchData(TABLE_INFORMATION, { type: 'cost' });
    const cost = _.map(services, service => ({ [service.title]: service.pricesString }));
    const excludedDatesData = await db.fetchData(TABLE_EXCLUDED_DATES);
    const excludedDates = _.map(excludedDatesData, (data) => data.date);
    const transactions = await db.fetchData(TABLE_TRANSACTIONS);
    const listOfDates = _.flatten(_.map(transactions, t => eachDay(t.dateFrom, t.dateTo)));
    const booked = _.countBy(listOfDates);
    res.json({
      data: {
        cost,
        excludedDates,
        booked,
      }
    });
  }),
];

const bookingPost = [
  wrapAsync(async (req, res) => {
    const paymentData = req.body.data;
    const confirmedData = _.assign({
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
