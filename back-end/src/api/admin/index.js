import { wrapAsync } from '../../middleware/errorHandling';
import db from '../../storage/db';
import { TABLE_ADMINISTRATOR } from '../../storage/tableName';

// logs the user in
const loginAdmin = [
  wrapAsync(async (req, res) => {
    req.session.key = req.body.email;
    const { email } = req.body;
    const today = new Date();
    const loginActivityDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDay()}`;
    const loginActivityTime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const loginActivity = `${loginActivityDate}T${loginActivityTime}`;
    await db.updateData(TABLE_ADMINISTRATOR, { loginActivity }, { email });
    return res.json({ data: 'success' });
  }),
];

// logs the user out
const getLogout = [
  wrapAsync(async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(400).json({ error: 'logout error' });
      }
      return res.json({ data: 'success' });
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
