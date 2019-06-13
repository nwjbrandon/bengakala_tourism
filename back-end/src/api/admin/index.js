const loginAdmin = [
  async (req, res) => {
    req.session.key = req.body.email;
    res.json({ data: 'success' });
  },
];

const getLogout = [
  async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).json({ error: 'logout error' });
      } else {
        res.json({ data: 'success' });
      }
    });
  }
];

const errorAdmin = [
  async (err, req, res, next) => res.status(401).send({ success: false, message: err }),
];

export default {
  login: loginAdmin,
  logout: getLogout,
  err: errorAdmin,
};
