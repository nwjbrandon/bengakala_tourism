import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';
import { processedDataToChangeInDB } from '../../utils/processedData';
import {wrapAsync} from "../../middleware/errorHandling";

const getExploreInfo = [
  wrapAsync(async (req, res) => {
    const attractions = await db.fetchData(TABLE_INFORMATION, { type: 'video' });
    const data = _.mapValues(_.groupBy(attractions, 'uuid'), (value) => {
      const v = _.head(value);
      return {
        title: v.title,
        text: v.text,
        type: v.type,
        edit: v.edit,
        imgUrl: v.imgUrl,
        subheading: v.subheading,
      };
    });
    res.json({
      data,
    });
  }),
];

const postExploreInfo = [
  wrapAsync(async (req, res) => {
    const receivedData = req.body.data;
    const existingUUID = await db.filterFieldList(TABLE_INFORMATION, { type: 'video' }, 'uuid');
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


export default {
  get: getExploreInfo,
  post: postExploreInfo,
};
