import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';

const getContactInfo = [
  async (req, res) => {
    const homes = await db.fetchData(TABLE_INFORMATION, { type: 'home' });
    const stories = _.map(homes, home => (
      {
        [home.uuid]: {
          title: home.title,
          text: home.text,
          createdAt: home.createdAt,
          type: home.type,
          edit: home.edit,
        }
      }));
    const missions = await db.fetchData(TABLE_INFORMATION, { type: 'mission' });
    const objective = _.map(missions, mission => (
      {
        [mission.uuid]: {
          title: mission.title,
          text: mission.text,
          createdAt: mission.createdAt,
          type: mission.type,
          edit: mission.edit,
        }
      }));
    res.json({
      data: {
        stories,
        objective
      }
    });
  },
];

export default {
  get: getContactInfo,
};
