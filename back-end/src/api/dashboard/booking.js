import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';
import { processedDataToChangeInDB } from '../../utils/processedData';
import { wrapAsync } from "../../middleware/errorHandling";

const getBookingInfo = [
  wrapAsync(async (req, res) => {
    const costs = await db.fetchData(TABLE_INFORMATION, { type: 'cost' });
    const data = _.mapValues(_.groupBy(costs, 'uuid'), (value) => {
      const v = _.head(value);
      return {
        title: v.title,
        pricesString: v.pricesString,
        type: v.type,
        edit: v.edit,
      };
    });
    res.json({
      data,
    });
  }),
];

const postBookingInfo = [
  wrapAsync(async (req, res) => {
    const receivedData = req.body.data;
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
    return res.json({
      data: 'success'
    });
  })
];


export default {
  get: getBookingInfo,
  post: postBookingInfo,
};
