import _ from 'lodash';
import { eachDay } from 'date-fns';
import db from '../../storage/db';
import { TABLE_TRANSACTIONS } from '../../storage/tableName';
import { wrapAsync } from '../../middleware/errorHandling';

const dashboardGet = [
  wrapAsync(async (req, res) => {
    const transactions = await db.fetchData(TABLE_TRANSACTIONS);
    const transactionData = _.mapValues(_.groupBy(transactions, 'uuid'), (value) => {
      const v = _.head(value);
      return {
        uuid: v.uuid,
        firstName: v.firstName,
        lastName: v.lastName,
        email: v.email,
        country: v.country,
        dateFrom: v.dateFrom,
        dateTo: v.dateTo,
        breakfast: v.breakfast,
        lunch: v.lunch,
        dinner: v.dinner,
        males: v.males,
        females: v.females,
        cars: v.cars,
        van: v.van,
        motorbikes: v.motorbikes,
        checkedIn: v.checkedIn,
        cash: v.cash,
        createdAt: v.createdAt,
        carsAirport: v.carsAirport,
        airportLocation: v.airportLocation,
      };
    });
    const transaction = _.orderBy(transactionData, ['createdAt'], ['desc']);
    const listOfDates = _.flatten(_.map(transactions, (t) => {
      const totalDates = [];
      const totalCounts = _.toNumber(t.males) + _.toNumber(t.females);
      const dates = eachDay(t.dateFrom, t.dateTo);
      _.times(totalCounts, () => totalDates.push(dates));
      return _.flatten(totalDates);
    }));
    const calendarHeatMap = _.countBy(listOfDates);
    return res.json({
      data: {
        transaction,
        calendarHeatMap,
      }
    });
  })
];

const dashboardPost = [
  wrapAsync(async (req, res) => {
    await db.updateData(TABLE_TRANSACTIONS, { checkedIn: true }, { uuid: req.body.data });
    return res.json({
      data: 'success',
    });
  })
];

const dashboardDel = [
  wrapAsync(async (req, res) => {
    const uuid = req.body.data;
    await db.deleteData(TABLE_TRANSACTIONS, { uuid });
    return res.json({
      data: 'success',
    });
  })
];

export default {
  get: dashboardGet,
  post: dashboardPost,
  del: dashboardDel,
};
