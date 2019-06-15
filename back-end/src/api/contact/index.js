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

const contactPut = [
  async (req, res) => {
    console.log(req.body.data);
    const customer = req.body.data
    const uuid = _.head(_.keys(customer));
    const customerData = customer[uuid];
    const data = _.assign({
      uuid,
      heading: customerData.name,
      subheading: customerData.phone,
      title: customerData.email,
      paragraph: customerData.subject,
      subparagraph: customerData.message,
      edit: true,
      type: 'customer',
    });
    await db.saveData(TABLE_INFORMATION, data);
    res.json({
      data: 'success'
    });
  },
];


export default {
  info: contactInfo,
  put: contactPut,
};
