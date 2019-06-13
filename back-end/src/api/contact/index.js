import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';

const contactInfo = [
  async (req, res) => {
    const contacts = await db.fetchData(TABLE_INFORMATION, { type: 'contact' });
    const info = _.map(contacts, contact => (
      {
        title: contact.title,
        info: contact.text,
      }));
    res.json({
      data: info,
    });
  },
];

export default {
  info: contactInfo,
};
