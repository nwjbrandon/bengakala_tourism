import _ from 'lodash';
import bcrypt from 'bcryptjs';
import db from '../../storage/db';
import { TABLE_ADMINISTRATOR } from '../../storage/tableName';
import { wrapAsync } from '../../middleware/errorHandling';

// get the data for the dashboard setting page
const getContactInfo = [
  wrapAsync(async (req, res) => {
    // fetch data of root administrators
    const editableAdmin = await db.fetchData(TABLE_ADMINISTRATOR, { edit: true });
    const editable = _.mapValues(_.groupBy(editableAdmin, 'uuid'), (value) => {
      const v = _.head(value);
      return {
        username: v.username,
        email: v.email,
        phone: v.phone,
        jobTitle: v.jobTitle,
        edit: v.edit,
      };
    });

    // fetch data of non-root administrators
    const uneditableAdmin = await db.fetchData(TABLE_ADMINISTRATOR, { edit: false });
    const uneditable = _.mapValues(_.groupBy(uneditableAdmin, 'uuid'), (value) => {
      const v = _.head(value);
      return {
        username: v.username,
        email: v.email,
        phone: v.phone,
        jobTitle: v.jobTitle,
        edit: v.edit,
      };
    });
    return res.json({
      data: {
        uneditable,
        editable
      }
    });
  }),
];

// create new user
const putContactInfo = [
  wrapAsync(async (req, res) => {
    const { confirmedPassword, ...newUser } = req.body;
    const { password } = newUser;
    const salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(password, salt);
    newUser.edit = 1;
    await db.saveData(TABLE_ADMINISTRATOR, newUser);
    return res.json({
      data: 'success',
    });
  }),
];

// delete user
const deleteContactInfo = [
  wrapAsync(async (req, res) => {
    const uuid = req.body.data;
    await db.deleteData(TABLE_ADMINISTRATOR, { uuid });
    return res.json({
      data: 'success',
    });
  }),
];

// update password
const postContactInfo = [
  wrapAsync(async (req, res) => {
    const { email, newPassword } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(newPassword, salt);
    await db.updateData(TABLE_ADMINISTRATOR, { password }, { email });
    return res.json({
      data: 'success',
    });
  }),
];


export default {
  get: getContactInfo,
  put: putContactInfo,
  del: deleteContactInfo,
  post: postContactInfo,
};
