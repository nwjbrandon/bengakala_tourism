import _ from 'lodash';
import bcrypt from 'bcryptjs';
import db from '../../storage/db';
import {TABLE_ADMINISTRATOR} from '../../storage/tableName';

const getContactInfo = [
  async (req, res) => {
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
    res.json({
      data: {
        uneditable,
        editable
      }
    });
  },
];

const putContactInfo = [
  async (req, res) => {
    const newUser = req.body.data;
    const uuid = _.head(_.keys(newUser));
    const newUserData = _.assign({
      uuid,
      ...newUser[uuid],
    });
    const { password } = newUserData;
    const salt = bcrypt.genSaltSync(10);
    newUserData.password = bcrypt.hashSync(password, salt);
    await db.saveData(TABLE_ADMINISTRATOR, newUserData);
    res.json({
      data: 'success',
    });
  },
];

const deleteContactInfo = [
  async (req, res) => {
    const delUser = req.body.data;
    const uuid = _.head(_.keys(delUser));
    await db.deleteData(TABLE_ADMINISTRATOR, { uuid });
    res.json({
      data: 'success',
    });
  },
];

const postContactInfo = [
  async (req, res) => {
    const { email, existingPassword, newPassword } = req.body.data;
    const info = _.head(await db.fetchData(TABLE_ADMINISTRATOR, { email }));
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(newPassword, salt);
    if (bcrypt.compareSync(existingPassword, info.password)) {
      await db.updateData(TABLE_ADMINISTRATOR, { password }, { email });
    } else {
      console.log('password is not the same');
    }
    res.json({
      data: 'success',
    });
  },
];


export default {
  get: getContactInfo,
  put: putContactInfo,
  del: deleteContactInfo,
  post: postContactInfo,
};
