import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';
import { processedDataToChangeInDB } from '../../utils/processedData';

const getContactInfo = [
  async (req, res) => {
    const contacts = await db.fetchData(TABLE_INFORMATION, { type: 'contact' });
    const data = _.mapValues(_.groupBy(contacts, 'uuid'), (value) => {
      const v = _.head(value);
      return {
        title: v.title,
        text: v.text,
        createdAt: v.createdAt,
        type: v.type,
        edit: v.edit,
      };
    });
    res.json({
      data,
    });
  },
];

const postContactInfo = [
  async (req, res) => {
    const receivedData = req.body.data;
    const existingUUID = await db.filterFieldList(TABLE_INFORMATION, { type: 'contact' }, 'uuid');
    const { updateList, saveList, deleteList } = processedDataToChangeInDB({ receivedData, existingUUID });
    await db.changeListData(TABLE_INFORMATION, {
      updateList,
      saveList,
      deleteList,
    });
    res.json({
      data: 'success'
    });
  },
];


export default {
  get: getContactInfo,
  post: postContactInfo,
};
