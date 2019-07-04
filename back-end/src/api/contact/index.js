import _ from 'lodash';
import { validationResult, } from 'express-validator/check';

import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';

const contactInfo = [
  async (req, res) => {
    const contacts = await db.fetchData(TABLE_INFORMATION, { type: 'contact' });
    const data = _.mapValues(_.groupBy(contacts, 'title'), (value) => {
      const v = _.head(value);
      return v.text;
    });
    res.json({
      data,
    });
  },
];

const contactPut = [
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      const message = errors.array()[0].msg;
      return res.status(422).json({
        error: {
          code: 422,
          message,
        }
      });
    }
    try {
      const {
        uuid,
        contact,
        name,
        subject,
        message,
        email,
      } = req.body;
      const data = _.assign({
        uuid,
        heading: name,
        subheading: contact,
        title: email,
        paragraph: subject,
        subparagraph: message,
        edit: true,
        type: 'customer',
      });
      await db.saveData(TABLE_INFORMATION, data);
      return res.json({
        data: {
          code: 200,
          message: 'We will get back to you shortly'
        }
      });
    } catch (err) {
      return res.status(500).json({
        error: {
          code: 500,
          message: 'Server Error'
        }
      });
    }
  },
];


export default {
  info: contactInfo,
  put: contactPut,
};
