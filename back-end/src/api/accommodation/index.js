import _ from 'lodash';
import db from '../../storage';

const getAccomodation = [
  async (req, res) => {
    const info = { data: 'myAccomodation' };
    res.send(info);
  },
];

const accommodationInfo = [
  async (req, res) => {
    const services = await db.fetchData('INFORMATION', { type: 'cost' });
    console.log(services);
    const cost = _.map(services, service => ({ [service.title]: service.pricesString }));
    res.json({
      cost,
      excludedData: [],
    });
  },
];

export default {
  get: getAccomodation,
  info: accommodationInfo
};
