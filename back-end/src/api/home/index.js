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
        imgUrl: home.imgUrl,
      }));
    const missions = _.head(await db.fetchData(TABLE_INFORMATION, { type: 'mission' }));
    const mission = {
      text: missions.text,
      imgUrl: missions.imgUrl,
      title: missions.title,
    };
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
