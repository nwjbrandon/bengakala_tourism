import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';

const attractionInfo = [
  async (req, res) => {
    const attractions = await db.fetchData(TABLE_INFORMATION, { type: 'media' });
    const data = _.map(attractions, attraction => ({
      title: attraction.title,
      imgUrl: attraction.imgUrl,
      text: attraction.text,
      summary: attraction.heading,
    }));
    res.json({
      data
    });
  },
];

export default {
  info: attractionInfo,
};
