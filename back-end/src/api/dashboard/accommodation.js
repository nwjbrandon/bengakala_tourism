import _ from 'lodash';
import db from '../../storage/db';
import { TABLE_INFORMATION } from '../../storage/tableName';

const getAccommodationInfo = [
  async (req, res) => {
    const costs = await db.fetchData(TABLE_INFORMATION, { type: 'cost' });
    const data = _.map(costs, cost => (
      {
        [cost.uuid]: {
          title: cost.title,
          pricesString: cost.pricesString,
          createdAt: cost.createdAt,
          type: cost.type,
          edit: cost.edit,
        }
      }));
    res.json({
      data,
    });
  },
];

export default {
  get: getAccommodationInfo,
};
