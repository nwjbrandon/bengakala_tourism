import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';
import { processedDataToChangeInDB } from '../../utils/processedData';

const getAttractionInfo = [
  async (req, res) => {
    const attractions = await db.fetchData(TABLE_INFORMATION, { type: 'attraction' });
    const data = _.mapValues(_.groupBy(attractions, 'uuid'), (value) => {
      const v = _.head(value);
      return {
        title: v.title,
        text: v.text,
        type: v.type,
        edit: v.edit,
        imgUrl: v.imgUrl,
      };
    });
    res.json({
      data,
    });
  },
];

const postAttractionInfo = [
  async (req, res) => {
    const receivedData = req.body.data;
    const existingUUID = await db.filterFieldList(TABLE_INFORMATION, { type: 'attraction' }, 'uuid');
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
  },
];


export default {
  get: getAttractionInfo,
  post: postAttractionInfo,
};
