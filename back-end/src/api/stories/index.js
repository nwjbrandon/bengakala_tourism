import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';
import { wrapAsync } from "../../middleware/errorHandling";

const storiesInfo = [
  wrapAsync(async (req, res) => {
    const stories = await db.fetchData(TABLE_INFORMATION, { type: 'media' });
    const data = _.orderBy(_.map(stories, story => ({
      title: story.title,
      imgUrl: story.imgUrl,
      text: story.text,
      summary: story.heading,
      createdAt: story.createdAt,
    })), ['createdAt'], ['desc']);
    res.json({
      data
    });
  }),
];

export default {
  info: storiesInfo,
};
