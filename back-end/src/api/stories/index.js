import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';
import { wrapAsync } from "../../middleware/errorHandling";

const storiesInfo = [
  wrapAsync(async (req, res) => {
    const { page } = req.params;
    const start = (_.toNumber(page) - 1) * 6;

    const stories = await db.fetchData(TABLE_INFORMATION, { type: 'media' });
    const latestStories = _.orderBy(_.map(stories, story => ({
      title: story.title,
      imgUrl: story.imgUrl,
      text: story.text,
      summary: story.heading,
      createdAt: story.createdAt,
      link: story.subheading,
    })), ['createdAt'], ['desc']).splice(0, 3);

    const pageStories = _.orderBy(_.map(stories, story => ({
      title: story.title,
      imgUrl: story.imgUrl,
      text: story.text,
      summary: story.heading,
      link: story.subheading,
      createdAt: story.createdAt,
    })), ['createdAt'], ['desc']).splice(start, start + 6);
    res.json({
      data: {
        latestStories,
        pageStories,
      }
    });
  }),
];

export default {
  info: storiesInfo,
};
