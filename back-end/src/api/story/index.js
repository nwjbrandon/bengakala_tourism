import { wrapAsync } from "../../middleware/errorHandling";
import { TABLE_INFORMATION } from "../../storage/tableName";
import _ from 'lodash';
import db from '../../storage/db';

const storyGet = [
  wrapAsync(async (req, res) => {
    const { tag } = req.params;

    const stories = await db.fetchData(TABLE_INFORMATION, { type: 'media' });
    const latestStories = _.orderBy(_.map(stories, story => ({
      title: story.title,
      imgUrl: story.imgUrl,
      text: story.text,
      summary: story.heading,
      createdAt: story.createdAt,
      link: story.subheading,
    })), ['createdAt'], ['desc']).splice(0, 3);

    const storyData = await db.fetchData(TABLE_INFORMATION, { subheading: tag, type: 'media' });
    const story = _.head(_.orderBy(_.map(storyData, story => ({
      title: story.title,
      imgUrl: story.imgUrl,
      text: story.text,
      summary: story.heading,
      createdAt: story.createdAt,
    })), ['createdAt'], ['desc']));

    res.json({
      data: {
        latestStories,
        story,
      }
    });
  }),
];

export default {
  get: storyGet,
};
