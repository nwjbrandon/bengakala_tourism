import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';
import { wrapAsync } from '../../middleware/errorHandling';

// obtain information for the explore page
const exploreInfo = [
  wrapAsync(async (req, res) => {
    const explores = await db.fetchData(TABLE_INFORMATION, { type: 'video' });
    const data = _.orderBy(_.map(explores, explore => ({
      title: explore.title,
      videoID: explore.imgUrl,
      text: explore.text,
      thumbnailUrl: explore.subheading,
      createdAt: explore.createdAt,
    })), ['createdAt'], ['desc']);
    return res.json({
      data
    });
  }),
];

export default {
  info: exploreInfo,
};
