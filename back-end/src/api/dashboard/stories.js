import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';
import { processedDataToChangeInDB } from '../../utils/processedData';
import { wrapAsync } from '../../middleware/errorHandling';

const getStoriesInfo = [
  wrapAsync(async (req, res) => {
    const stories = await db.fetchData(TABLE_INFORMATION, { type: 'media' });
    const data = _.orderBy(_.mapValues(_.groupBy(stories, 'uuid'), (value) => {
      const v = _.head(value);
      return {
        heading: v.heading,
        title: v.title,
        text: v.text,
        type: v.type,
        edit: v.edit,
        imgUrl: v.imgUrl,
        createdAt: v.createdAt,
      };
    }), ['createdAt'], ['desc']);
    return res.json({
      data,
    });
  }),
];

const postStoriesInfo = [
  wrapAsync(async (req, res) => {
    const receivedData = _.mapValues(req.body.data, (datum) => {
      const subheading = datum.title.replace(/\W+/g, '-').toLowerCase();
      return { subheading, ...datum };
    });
    const existingUUID = await db.filterFieldList(TABLE_INFORMATION, { type: 'media' }, 'uuid');
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
  get: getStoriesInfo,
  post: postStoriesInfo,
};
