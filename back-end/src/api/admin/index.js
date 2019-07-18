import { wrapAsync } from "../../middleware/errorHandling";

// logs the user in
const loginAdmin = [
  wrapAsync(async (req, res) => {
    req.session.key = req.body.email;
    return res.json({ data: 'success' });
  }),
];

// logs the user out
const getLogout = [
  wrapAsync(async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(400).json({ error: 'logout error' });
      } else {
        return res.json({ data: 'success' });
      }
    });
  })
];

// customize the error message when authentication is not successful
const errorAdmin = [
  async (err, req, res, next) => res.status(401).send({ success: false, message: err }),
];

export default {
  login: loginAdmin,
  logout: getLogout,
  err: errorAdmin,
};
