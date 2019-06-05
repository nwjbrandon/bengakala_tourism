const getAdmin = [
  async (req, res) => {
    const info = { data: 'myAdmin' };
    res.send(info);
  },
];

const loginAdmin = [
  async (req, res) => {
    console.log(req.body.email);
    req.session.key = req.body.email;
    const info = { data: 'Admin' };
    res.send(info);
  },
];

const getDashboard = [
  async (req, res) => {
    console.log(req);
    const info = { data: 'myDashboard' };
    res.send(info);
  },
];

const getLogout = [
  async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('logging out');
      }
    });
  }
];


export default {
  get: getAdmin,
  login: loginAdmin,
  dashboard: getDashboard,
  logout: getLogout,
};
