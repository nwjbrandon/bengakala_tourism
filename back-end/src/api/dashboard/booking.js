import _ from 'lodash';
import db from '../../storage/db';
import {TABLE_EXCLUDED_DATES, TABLE_INFORMATION} from '../../storage/tableName';
import { processedDataToChangeInDB } from '../../utils/processedData';
import { wrapAsync } from "../../middleware/errorHandling";
import uuid from 'uuid/v1';
import dateFns from 'date-fns';

const getBookingInfo = [
  wrapAsync(async (req, res) => {
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
    const excludedDatesData = await db.fetchData(TABLE_EXCLUDED_DATES);
    const excludedDates = _.map(excludedDatesData, (data) => {
      return [
          data.date,
          data.value,
      ]
    });
    res.json({
      data: {
        costs,
        dates: excludedDates,
      }
    });
  }),
];

const postBookingInfo = [
  wrapAsync(async (req, res) => {
    const receivedData = req.body.data.displayedData;
    const existingUUID = await db.filterFieldList(TABLE_INFORMATION, {type: 'cost'}, 'uuid');
    const {
      updateList,
      saveList,
      deleteList
    } = processedDataToChangeInDB({receivedData, existingUUID});
    await db.changeListData(TABLE_INFORMATION, {
      updateList,
      saveList,
      deleteList,
    });
    const excludedDates = req.body.data.excludedDates;
    await db.deleteData(TABLE_EXCLUDED_DATES);
    await excludedDates.forEach(async(item) => {
      await db.saveData(TABLE_EXCLUDED_DATES, {
        uuid: uuid(),
        date: dateFns.format(item[0], 'YYYY-MM-DD'),
        value: item[1],
      })
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
