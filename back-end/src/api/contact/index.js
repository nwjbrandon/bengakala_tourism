import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';

const contactInfo = [
  async (req, res) => {
    const contacts = await db.fetchData(TABLE_INFORMATION, { type: 'contact' });
    const data = _.map(contacts, contact => (
      {
        [contact.title]: contact.text,
      }));
    res.json({
      data,
    });
  },
];

export default {
  info: contactInfo,
};
