import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';
import { processedDataToChangeInDB } from '../../utils/processedData';
import { wrapAsync } from '../../middleware/errorHandling';

// fetch data for the faq page
const getContactInfo = [
  wrapAsync(async (req, res) => {
    const faqs = await db.fetchData(TABLE_INFORMATION, { type: 'faq' });
    const data = _.mapValues(_.groupBy(faqs, 'uuid'), (value) => {
      const v = _.head(value);
      return {
        heading: v.heading,
        title: v.title,
        text: v.text,
        type: v.type,
        edit: v.edit,
      };
    });
    return res.json({
      data,
    });
  }),
];

// update data for the faq page
const postFaqInfo = [
  wrapAsync(async (req, res) => {
    const receivedData = req.body.data;
    const existingUUID = await db.filterFieldList(TABLE_INFORMATION, { type: 'faq' }, 'uuid');
    const {
      updateList,
      saveList,
      deleteList
    } = processedDataToChangeInDB({ receivedData, existingUUID });
    await db.changeListData(TABLE_INFORMATION, {
      updateList,
      saveList,
      deleteList,
    });
    return res.json({
      data: 'success'
    });
  }),
];


export default {
  get: getContactInfo,
  post: postFaqInfo,
};
