import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_ADMINISTRATOR } from '../../storage/tableName';

const getContactInfo = [
  async (req, res) => {
    const uneditableAdmin = await db.fetchData(TABLE_ADMINISTRATOR, { edit: false });
    const uneditable = _.map(uneditableAdmin, admin => (
      {
        [admin.uuid]: {
          username: admin.username,
          email: admin.email,
          phone: admin.phone,
          jobTitle: admin.jobTitle,
          createdAt: admin.createdAt,
          edit: admin.edit,
        }
      }));
    const editableAdmin = await db.fetchData(TABLE_ADMINISTRATOR, { edit: true });
    const editable = _.map(editableAdmin, admin => (
      {
        [admin.uuid]: {
          username: admin.username,
          email: admin.email,
          phone: admin.phone,
          jobTitle: admin.jobTitle,
          createdAt: admin.createdAt,
          edit: admin.edit,
        }
      }));
    res.json({
      data: {
        uneditable,
        editable
      }
    });
  },
];

export default {
  get: getContactInfo,
};
