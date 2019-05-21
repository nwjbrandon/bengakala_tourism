const getAdmin = [
  async (req, res) => {
    const info = { data: 'myAdmin' };
    res.send(info);
  },
];

const loginAdmin = [
  async (req, res) => {
    const info = { data: 'Admin' };
    res.send(info);
  },
]

export default {
  get: getAdmin,
  login: loginAdmin,
};
