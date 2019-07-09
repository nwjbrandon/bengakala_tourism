import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';

const bulletinInfo = [
  async (req, res) => {
    const bulletins = await db.fetchData(TABLE_INFORMATION, { type: 'media' });
    const data = _.map(bulletins, bulletin => ({
      title: bulletin.title,
      imgUrl: bulletin.imgUrl,
      text: bulletin.text,
      summary: bulletin.heading,
    }));
    res.json({
      data
    });
  },
];

export default {
  info: bulletinInfo,
};
