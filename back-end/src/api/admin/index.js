const getAdmin = [
  async (req, res) => {
    console.log(req.session);
  const info = { data: 'myAdmin' };
    res.send(info);
  },
];

const loginAdmin = [
  async (req, res) => {
    console.log(req.session);
    const info = { data: 'Admin' };
    res.send(info);
  },
]

export default {
  get: getAdmin,
  login: loginAdmin,
};
