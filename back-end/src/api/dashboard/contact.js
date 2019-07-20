import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';
import { processedDataToChangeInDB } from '../../utils/processedData';
import { wrapAsync } from '../../middleware/errorHandling';

// fetch information for the dashboard contact page
const getContactInfo = [
  wrapAsync(async (req, res) => {
    // fetch the contact details
    const contacts = await db.fetchData(TABLE_INFORMATION, { type: 'contact' });
    const contact = _.mapValues(_.groupBy(contacts, 'uuid'), (value) => {
      const v = _.head(value);
      return {
        title: v.title,
        text: v.text,
        type: v.type,
        edit: v.edit,
      };
    });

    // fetch the customer queries
    const customers = await db.fetchData(TABLE_INFORMATION, { type: 'customer' });
    const customer = _.mapValues(_.groupBy(customers, 'uuid'), (value) => {
      const v = _.head(value);
      return {
        heading: v.heading,
        subheading: v.subheading,
        title: v.title,
        paragraph: v.paragraph,
        subparagraph: v.subparagraph,
        type: v.type,
        edit: v.edit,
        date: v.createdAt,
      };
    });
    return res.json({
      data: {
        contact,
        customer,
      }
    });
  }),
];

// update the contact details
const postContactInfo = [
  wrapAsync(async (req, res) => {
    const receivedData = req.body.data;
    const existingUUID = await db.filterFieldList(TABLE_INFORMATION, { type: 'contact' }, 'uuid');
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

// delete the customer queries
const deleteContactInfo = [
  wrapAsync(async (req, res) => {
    const uuid = req.body.data;
    await db.deleteData(TABLE_INFORMATION, { uuid });
    return res.json({
      data: 'success',
    });
  }),
];

export default {
  get: getContactInfo,
  post: postContactInfo,
  del: deleteContactInfo,
};
