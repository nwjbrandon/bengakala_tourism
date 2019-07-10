import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';
import { wrapAsync } from "../../middleware/errorHandling";

const bulletinInfo = [
  wrapAsync(async (req, res) => {
    const bulletins = await db.fetchData(TABLE_INFORMATION, { type: 'media' });
    const data = _.orderBy(_.map(bulletins, bulletin => ({
      title: bulletin.title,
      imgUrl: bulletin.imgUrl,
      text: bulletin.text,
      summary: bulletin.heading,
      createdAt: bulletin.createdAt,
    })), ['createdAt'], ['desc']);
    res.json({
      data
    });
  }),
];

export default {
  info: bulletinInfo,
};
