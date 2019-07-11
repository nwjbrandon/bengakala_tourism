import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';
import {wrapAsync} from "../../middleware/errorHandling";

const aboutInfo = [
  wrapAsync(async (req, res) => {
    const homes = await db.fetchData(TABLE_INFORMATION, { type: 'home' });
    const stories = _.map(homes, home => (
      {
        title: home.title,
        text: home.text,
      }));
    const missions = await db.fetchData(TABLE_INFORMATION, { type: 'mission' });
    const mission = _.head(missions).text;
    res.send({
      data: {
        stories,
        mission,
      }
    });
  }),
];

export default {
  info: aboutInfo,
};
