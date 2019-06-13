import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';

const getAttractionInfo = [
  async (req, res) => {
    const attractions = await db.fetchData(TABLE_INFORMATION, { type: 'attraction' });
    const data = _.map(attractions, attraction => (
      {
        [attraction.uuid]: {
          title: attraction.title,
          text: attraction.text,
          createdAt: attraction.createdAt,
          type: attraction.type,
          edit: attraction.edit,
        }
      }));
    res.json({
      data,
    });
  },
];

export default {
  get: getAttractionInfo,
};
