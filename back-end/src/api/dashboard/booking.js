import _ from 'lodash';
import uuid from 'uuid/v1';
import dateFns from 'date-fns';
import db from '../../storage/db';
import { TABLE_EXCLUDED_DATES, TABLE_INFORMATION } from '../../storage/tableName';
import { processedDataToChangeInDB } from '../../utils/processedData';
import { wrapAsync } from '../../middleware/errorHandling';

// fetch data for the dashboard/booking page
const getBookingInfo = [
  wrapAsync(async (req, res) => {
    // fetch the list of costs for items
    const costsData = await db.fetchData(TABLE_INFORMATION, { type: 'cost' });
    const costs = _.mapValues(_.groupBy(costsData, 'uuid'), (value) => {
      const v = _.head(value);
      return {
        title: v.title,
        pricesString: v.pricesString,
        type: v.type,
        edit: v.edit,
      };
    });

    // fetch the list of pictures of the houses
    const bookingData = await db.fetchData(TABLE_INFORMATION, { type: 'booking' });
    const booking = _.mapValues(_.groupBy(bookingData, 'uuid'), (value) => {
      const v = _.head(value);
      return {
        title: v.title,
        imgUrl: v.imgUrl,
        type: v.type,
        edit: v.edit,
      };
    });

    // fetch the list of excluded dates
    const excludedDatesData = await db.fetchData(TABLE_EXCLUDED_DATES);
    const excludedDates = _.map(excludedDatesData, data => [
      data.date,
      data.value,
    ]);
    return res.json({
      data: {
        costs,
        dates: excludedDates,
        booking,
      }
    });
  }),
];

// update the information for the booking page
const postBookingInfo = [
  wrapAsync(async (req, res) => {
    const { displayedData: { costs, booking }, excludedDates } = req.body.data;

    // update the cost of items
    const existingCostsUUID = await db.filterFieldList(TABLE_INFORMATION, { type: 'cost' }, 'uuid');
    const {
      updateList: updateCostList,
      saveList: saveCostList,
      deleteList: deleteCostList
    } = processedDataToChangeInDB({ receivedData: costs, existingUUID: existingCostsUUID });
    await db.changeListData(TABLE_INFORMATION, {
      updateList: updateCostList,
      saveList: saveCostList,
      deleteList: deleteCostList,
    });

    // update the list of pictures of the houses
    const existingBookingUUID = await db.filterFieldList(TABLE_INFORMATION, { type: 'booking' }, 'uuid');
    const {
      updateList: updateBookingList,
      saveList: saveBookingList,
      deleteList: deleteBookingList
    } = processedDataToChangeInDB({ receivedData: booking, existingUUID: existingBookingUUID });
    await db.changeListData(TABLE_INFORMATION, {
      updateList: updateBookingList,
      saveList: saveBookingList,
      deleteList: deleteBookingList,
    });

    // update the list of excluded dates
    await db.deleteData(TABLE_EXCLUDED_DATES);
    await excludedDates.forEach(async (item) => {
      await db.saveData(TABLE_EXCLUDED_DATES, {
        uuid: uuid(),
        date: dateFns.format(item[0], 'YYYY-MM-DD'),
        value: item[1],
      });
    });
    return res.json({
      data: 'success'
    });
  })
];


export default {
  get: getBookingInfo,
  post: postBookingInfo,
};
