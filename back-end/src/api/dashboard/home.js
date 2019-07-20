import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';
import { processedDataToChangeInDB } from '../../utils/processedData';
import { wrapAsync } from '../../middleware/errorHandling';

// fetch data for the dashboard home page
const getContactInfo = [
  wrapAsync(async (req, res) => {
    // fetch data that are displayed on the attractions part of the home page
    const homes = await db.fetchData(TABLE_INFORMATION, { type: 'home' });
    const stories = _.mapValues(_.groupBy(homes, 'uuid'), (value) => {
      const v = _.head(value);
      return {
        title: v.title,
        text: v.text,
        type: v.type,
        edit: v.edit,
        imgUrl: v.imgUrl,
      };
    });

    // fetch data that are displayed on the top part of the home page
    const missions = await db.fetchData(TABLE_INFORMATION, { type: 'mission' });
    const objective = _.mapValues(_.groupBy(missions, 'uuid'), (value) => {
      const v = _.head(value);
      return {
        title: v.title,
        text: v.text,
        type: v.type,
        edit: v.edit,
        imgUrl: v.imgUrl,
      };
    });
    return res.json({
      data: {
        stories,
        objective
      }
    });
  }),
];

// update data for the dashboard home page
const postHomeInfo = [
  wrapAsync(async (req, res) => {
    const { stories: receivedData, objective } = req.body.data;
    const existingUUID = await db.filterFieldList(TABLE_INFORMATION, { type: 'home' }, 'uuid');
    const {
      updateList,
      saveList,
      deleteList
    } = processedDataToChangeInDB({ receivedData, existingUUID });
    await db.updateData(
      TABLE_INFORMATION,
      _.head(_.values(objective)),
      { type: 'mission' }
    );
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
  post: postHomeInfo,
};
