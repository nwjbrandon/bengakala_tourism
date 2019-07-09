import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';
import { processedDataToChangeInDB } from '../../utils/processedData';
import {wrapAsync} from "../../middleware/errorHandling";

const getContactInfo = [
  wrapAsync(async (req, res) => {
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
    res.json({
      data: {
        contact,
        customer,
      }
    });
  }),
];

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
    res.json({
      data: 'success'
    });
  }),
];

const deleteContactInfo = [
  wrapAsync(async (req, res) => {
    const uuid = req.body.data;
    await db.deleteData(TABLE_INFORMATION, { uuid });
    res.json({
      data: 'success',
    });
  }),
];

export default {
  get: getContactInfo,
  post: postContactInfo,
  del: deleteContactInfo,
};
