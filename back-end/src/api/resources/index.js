import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';
import {wrapAsync} from "../../middleware/errorHandling";

const resourcesInfo = [
  wrapAsync(async (req, res) => {
    const attractions = await db.fetchData(TABLE_INFORMATION, { type: 'video' });
    const data = _.map(attractions, attraction => ({
      title: attraction.title,
      videoLink: attraction.imgUrl,
      videoDescription: attraction.text,
    }));
    res.json({
      data
    });
  }),
];

export default {
  info: resourcesInfo,
};
