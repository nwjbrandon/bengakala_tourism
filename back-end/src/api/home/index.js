import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';
import { wrapAsync } from '../../middleware/errorHandling';

// obtain information for the home page
const homeInfo = [
  wrapAsync(async (req, res) => {
    // obtain the list of attractions of the village
    const homes = await db.fetchData(TABLE_INFORMATION, { type: 'home' });
    const stories = _.orderBy(_.map(homes, home => (
      {
        title: home.title,
        text: home.text,
        imgUrl: home.imgUrl,
        createdAt: home.createdAt,
      })), ['createdAt'], ['desc']);

    // obtain the objective of the website
    const missions = _.head(await db.fetchData(TABLE_INFORMATION, { type: 'mission' }));
    const mission = {
      text: missions.text,
      imgUrl: missions.imgUrl,
      title: missions.title,
    };
    return res.send({
      data: {
        stories,
        mission,
      }
    });
  }),
];

export default {
  info: homeInfo,
};
