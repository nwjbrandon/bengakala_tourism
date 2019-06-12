import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';

const accommodationInfo = [
  async (req, res) => {
    const services = await db.fetchData(TABLE_INFORMATION, { type: 'cost' });
    console.log(services);
    const cost = _.map(services, service => ({ [service.title]: service.pricesString }));
    res.json({
      cost,
      excludedData: [],
    });
  },
];

export default {
  info: accommodationInfo
};
