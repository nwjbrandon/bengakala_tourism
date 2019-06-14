import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';

const getContactInfo = [
  async (req, res) => {
    const faqs = await db.fetchData(TABLE_INFORMATION, { type: 'faq' });
    const data = _.map(faqs, faq => (
      {
        [faq.uuid]: {
          heading: faq.heading,
          title: faq.title,
          text: faq.text,
          createdAt: faq.createdAt,
          type: faq.type,
          edit: faq.edit,
        }
      }));
    res.json({
      data,
    });
  },
];

export default {
  get: getContactInfo,
};
