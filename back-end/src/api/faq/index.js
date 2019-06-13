import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';

const faqInfo = [
  async (req, res) => {
    const faqs = await db.fetchData(TABLE_INFORMATION, { type: 'faq' });
    const ungroupedFaqs = _.map(faqs, faq => (
      {
        heading: faq.heading,
        question: faq.title,
        answer: faq.text,
      }));
    const groupedFaqs = _.groupBy(ungroupedFaqs, 'heading');
    res.json({
      data: groupedFaqs,
    });
  },
];

export default {
  info: faqInfo,
};
