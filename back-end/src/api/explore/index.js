import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';
import {wrapAsync} from "../../middleware/errorHandling";

const exploreInfo = [
  wrapAsync(async (req, res) => {
    const explores = await db.fetchData(TABLE_INFORMATION, { type: 'video' });
    const data = _.map(explores, explore => ({
      title: explore.title,
      videoLink: explore.imgUrl,
      videoDescription: explore.text,
    }));
    res.json({
      data
    });
  }),
];

export default {
  info: exploreInfo,
};
