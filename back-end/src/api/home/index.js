import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';

const aboutInfo = [
  async (req, res) => {
    const homes = await db.fetchData(TABLE_INFORMATION, { type: 'home' });
    const stories = _.map(homes, home => (
      {
        [home.title]: home.text,
      }));
    const missions = await db.fetchData(TABLE_INFORMATION, { type: 'mission' });
    const mission = _.head(missions).text;
    console.log(mission);
    res.send({
      data: {
        stories,
        mission,
      }
    });
  },
];

export default {
  info: aboutInfo,
};
