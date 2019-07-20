import _ from 'lodash';
import { wrapAsync } from '../../middleware/errorHandling';
import { TABLE_INFORMATION } from '../../storage/tableName';
import db from '../../storage/db';

// obtain information for the story page
const storyGet = [
  wrapAsync(async (req, res) => {
    const { tag } = req.params;

    // obtain the top 3 latest stories
    const stories = await db.fetchData(TABLE_INFORMATION, { type: 'media' });
    const latestStories = _.orderBy(_.map(stories, story => ({
      title: story.title,
      imgUrl: story.imgUrl,
      text: story.text,
      summary: story.heading,
      createdAt: story.createdAt,
      link: story.subheading,
    })), ['createdAt'], ['desc']).splice(0, 3);

    // obtain information for the story article
    const storyData = await db.fetchData(TABLE_INFORMATION, { subheading: tag, type: 'media' });
    const story = _.head(_.orderBy(_.map(storyData, story => ({
      title: story.title,
      imgUrl: story.imgUrl,
      text: story.text,
      summary: story.heading,
      createdAt: story.createdAt,
    })), ['createdAt'], ['desc']));

    return res.json({
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
