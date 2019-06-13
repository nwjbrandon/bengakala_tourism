import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';

const getContactInfo = [
  async (req, res) => {
    const contacts = await db.fetchData(TABLE_INFORMATION, { type: 'contact' });
    const data = _.map(contacts, contact => (
      {
        [contact.uuid]: {
          title: contact.title,
          text: contact.text,
          createdAt: contact.createdAt,
          type: contact.type,
          edit: contact.edit,
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
