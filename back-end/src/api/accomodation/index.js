const getAccomodation = [
  async (req, res) => {
    const info = { data: 'myAccomodation' };
    res.send(info);
  },
];

const accommodationCost = [
  async (req, res) => {
    const data = {
      blockedDate: [
        {
          from: new Date(2019, 5, 23),
          to: new Date(2019, 5, 30)
        },
        {
          from: new Date(2019, 6, 1),
          to: new Date(2019, 6, 5)
        },
      ],
      van: 30,
      house: 50,
      motorbike: 10,
    };
    res.json({ data });
  },
];

export default {
  get: getAccomodation,
  cost: accommodationCost
};
