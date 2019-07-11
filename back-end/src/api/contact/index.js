import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';
import {wrapAsync} from "../../middleware/errorHandling";

const contactInfo = [
  wrapAsync(async (req, res) => {
    const contacts = await db.fetchData(TABLE_INFORMATION, { type: 'contact' });
    const data = _.mapValues(_.groupBy(contacts, 'title'), (value) => {
      const v = _.head(value);
      return v.text;
    });
    res.json({
      data,
    });
  }),
];

const contactPut = [
  wrapAsync(async (req, res) => {
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
  }),
];


export default {
  info: contactInfo,
  put: contactPut,
};
