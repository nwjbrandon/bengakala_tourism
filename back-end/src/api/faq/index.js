import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';
import { wrapAsync } from "../../middleware/errorHandling";

// obtain information for the faq page
const faqInfo = [
  wrapAsync(async (req, res) => {
    // obtain the list of faqs
    const faqs = await db.fetchData(TABLE_INFORMATION, { type: 'faq' });
    const ungroupedFaqs = _.map(faqs, faq => (
      {
        heading: faq.heading,
        question: faq.title,
        answer: faq.text,
      }));

    // obtain a list of faqs grouped by their type
    const groupedFaqs = _.groupBy(ungroupedFaqs, 'heading');
    return res.json({
      data: {
          groupedFaqs,
          ungroupedFaqs,
      },
    });
  }),
];

export default {
  info: faqInfo,
};
